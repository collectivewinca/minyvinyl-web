import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CheckCircle } from 'lucide-react';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const registrationId = searchParams.get('registrationId');
        const sessionId = searchParams.get('session_id');

        if (!registrationId) {
          throw new Error('No registration ID found');
        }

        // Get the registration document
        const registrationRef = doc(db, 'minyvinyl_registrations', registrationId);
        const registrationDoc = await getDoc(registrationRef);

        if (!registrationDoc.exists()) {
          throw new Error('Registration not found');
        }

        const registrationData = registrationDoc.data();

        // Check if payment is already completed
        if (registrationData.paymentStatus === 'completed') {
          setLoading(false);
          return; // Exit early if payment is already completed
        }

        // If we have a session ID, update the payment status
        if (sessionId) {
          await updateDoc(registrationRef, {
            paymentStatus: 'completed',
            paymentSessionId: sessionId,
            paymentCompletedAt: new Date()
          });
        } else {
          // If no session ID, check if payment is already completed
          if (registrationData.paymentStatus !== 'completed') {
            await updateDoc(registrationRef, {
              paymentStatus: 'completed',
              paymentCompletedAt: new Date()
            });
          }
        }

        // Send confirmation email if not already sent
        if (!registrationData.confirmationEmailSent) {
          try {
            await sendConfirmationEmail(
              registrationData.name,
              registrationData.email,
              registrationData.events,
              registrationData.total,
              registrationData.subscriptionDetails
            );

            // Mark email as sent only after successful sending
            await updateDoc(registrationRef, {
              confirmationEmailSent: true
            });
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Don't throw the error, just log it and continue
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error processing payment success:', err);
        setError(err instanceof Error ? err.message : 'Failed to process payment');
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [searchParams]);

  const sendConfirmationEmail = async (name: string, email: string, events: any[], total: number, subscriptionDetails: any) => {
    let contentSection;
    
    if (subscriptionDetails) {
      // If subscription is selected, only show subscription details
      contentSection = `
        <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Item</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #333;">Qty</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #333;">Unit Price</th>
                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #333;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #333;">
                  <div style="font-weight: bold;">MINY Annual Subscription</div>
                  <div style="font-size: 0.9em; color: #888;">Annual subscription to all MINY events (12 months at $29/month)</div>
                </td>
                <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">1</td>
                <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">$29/month</td>
                <td style="text-align: right; padding: 10px; border-bottom: 1px solid #333;">$${subscriptionDetails.totalAmount.toFixed(2)}</td>
              </tr>
              ${events && events.length > 0 ? events.map(event => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #333;">${event.name}</td>
                  <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">${event.quantity}</td>
                  <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">$${(event.price * 0.6).toFixed(2)}</td>
                  <td style="text-align: right; padding: 10px; border-bottom: 1px solid #333;">$${(event.price * 0.6 * event.quantity).toFixed(2)}</td>
                </tr>
              `).join('') : ''}
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
                <td style="text-align: right; padding: 10px; font-weight: bold;">$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #fbbf24; margin: 10px 0;"><strong>Subscription Period</strong></p>
            <p style="color: #ffffff; margin: 5px 0;">Start Date: ${new Date().toLocaleDateString()}</p>
            <p style="color: #ffffff; margin: 5px 0;">End Date: ${new Date(new Date().setMonth(new Date().getMonth() + 12)).toLocaleDateString()}</p>
          </div>
        </div>
      `;
    } else {
      // If no subscription, show individual events
      const eventList = events.map(event => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${event.name}</td>
          <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">${event.quantity}</td>
          <td style="text-align: center; padding: 10px; border-bottom: 1px solid #333;">$${event.price.toFixed(2)}</td>
          <td style="text-align: right; padding: 10px; border-bottom: 1px solid #333;">$${(event.price * event.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      contentSection = `
        <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Event</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #333;">Qty</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #333;">Unit Price</th>
                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #333;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${eventList}
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
                <td style="text-align: right; padding: 10px; font-weight: bold;">$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
        <div style="background-color: #000000; padding: 30px; border-radius: 10px; color: #ffffff;">
          <h1 style="color: #fbbf24; text-align: center; font-size: 28px; margin-bottom: 20px;">Thank You for Your MINY Registration!</h1>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're excited to confirm your registration${subscriptionDetails ? ' for the MINY Annual Subscription' : ' for the following MINY events'}:
          </p>
          
          ${contentSection}
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            ${subscriptionDetails 
              ? 'Welcome to the MINY community! Your subscription gives you access to all our events for the next 12 months.' 
              : 'We look forward to seeing you at our events! Please arrive 15 minutes before each event begins.'}
          </p>
          
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, feel free to reply to this email.
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #fbbf24; font-size: 14px;">MINY - Digital Vinyl Collectibles</p>
            <p style="color: #ffffff; font-size: 12px; margin-top: 5px;">
              <a href="https://minyvinyl.com" style="color: #fbbf24; text-decoration: none;">minyvinyl.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    try {
      const response = await fetch('https://send-email.alet8891.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: subscriptionDetails ? 'Your MINY Annual Subscription Confirmation' : 'Your MINY Event Registration Confirmation',
          html: emailContent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      return await response.json();
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen bg-black text-white flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574")'
        }}
      >
        <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-xl border border-red-500/20">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h1 className="text-2xl font-bold mb-2">Payment Processing Error</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <a
            href="/miny-events"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Return to Events
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-white flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574")'
      }}
    >
      {/* Overlay with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10 animate-gradient-x"></div>
      
      <div className="relative text-center p-8 bg-black/40 backdrop-blur-sm rounded-xl border border-amber-400/20 max-w-lg mx-4">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-amber-400 rounded-full p-4">
          <CheckCircle className="h-8 w-8 text-black" />
        </div>
        <h1 className="text-3xl font-bold mb-2 mt-4">Payment Successful!</h1>
        <p className="text-gray-300 mb-6">
          Thank you for your registration. A confirmation email has been sent to your inbox with all the details.
        </p>
        <div className="space-y-4">
          <a
            href="/miny-events"
            className="block w-full px-6 py-3 bg-amber-400 text-black rounded-lg font-medium hover:bg-amber-500 transition-colors"
          >
            Return to Events
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default Success; 