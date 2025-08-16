import * as React from 'react';
import { Phone, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendAdminEmail } from '@/lib/email';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EmergencyCallButton = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send email to admin
      await sendAdminEmail({
        phone: phoneNumber,
        requestType: 'Emergency Flight Callback Request'
      }, 'Emergency Flight Callback');
      
      // Show success message
      setShowSuccess(true);
      setPhoneNumber('');
    } catch (err) {
      console.error('Failed to send emergency callback request:', err);
      setError('Failed to send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col items-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="call-button bg-primary rounded-full p-3 shadow-lg cursor-pointer hover:bg-primary/90 transition-all duration-300 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center"
                onClick={openModal}
              >
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#333333] text-white border-none py-2 px-4 rounded-lg">
              <span className="text-sm font-medium">Emergency Flights Only (Free Instant Callback)</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Flight Request</DialogTitle>
          </DialogHeader>
          
          {showSuccess ? (
            <div className="py-6 text-center">
              <div className="mb-4 text-green-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Request Received!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We'll call you back immediately for your emergency flight needs.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => {
                  setShowSuccess(false);
                  setIsModalOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter your phone number and we'll call you back immediately for emergency flight bookings.
                </p>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    className="pl-10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Request Callback'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyCallButton;