import * as React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EmergencyCallButton = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleLandlineCall = () => {
    window.location.href = 'tel:020-360-31248';
    setIsModalOpen(false);
  };

  const handleWhatsAppCall = () => {
    window.open('https://wa.me/447304229064', '_blank');
    setIsModalOpen(false);
  };



  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="call-button bg-primary rounded-full p-3 shadow-lg cursor-pointer hover:bg-primary/90 transition-all duration-300 h-14 w-14 flex items-center justify-center animate-pulse"
                onClick={openModal}
              >
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-[#333333] text-white border-none py-2 px-4 rounded-lg">
              <span className="text-sm font-medium">Contact Us - Call or WhatsApp</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Choose how you'd like to contact us:
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleLandlineCall}
                className="w-full h-14 flex items-center justify-center gap-3 text-left"
                variant="outline"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">Call Landline</span>
                  <span className="text-sm text-muted-foreground">020-360-31248</span>
                </div>
              </Button>
              
              <Button 
                onClick={handleWhatsAppCall}
                className="w-full h-14 flex items-center justify-center gap-3 text-left bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageSquare className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">WhatsApp Chat</span>
                  <span className="text-sm text-green-100">+44 7304 229064</span>
                </div>
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <Button 
                variant="ghost" 
                onClick={() => setIsModalOpen(false)}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyCallButton;