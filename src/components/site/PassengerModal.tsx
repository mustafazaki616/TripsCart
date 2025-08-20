import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Minus, Plus, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerModalProps {
  passengers: PassengerCounts;
  onPassengersChange: (passengers: PassengerCounts) => void;
  className?: string;
}

export const PassengerModal: React.FC<PassengerModalProps> = ({
  passengers,
  onPassengersChange,
  className
}) => {
  const updateCount = (type: keyof PassengerCounts, increment: boolean) => {
    const newPassengers = { ...passengers };
    
    if (increment) {
      newPassengers[type] += 1;
    } else {
      if (type === 'adults' && newPassengers[type] > 1) {
        newPassengers[type] -= 1;
      } else if (type !== 'adults' && newPassengers[type] > 0) {
        newPassengers[type] -= 1;
      }
    }
    
    onPassengersChange(newPassengers);
  };

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  const getPassengerText = () => {
    const total = getTotalPassengers();
    if (total === 1) return '1 Passenger';
    return `${total} Passengers`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-12 w-full px-4 text-sm bg-white rounded-lg border border-gray-200 justify-start text-left font-normal",
            className
          )}
        >
          <Users className="mr-2 h-4 w-4" />
          {getPassengerText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="bg-gray-800 text-white rounded-lg p-4 space-y-4">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Adults</div>
              <div className="text-sm text-gray-300">12+</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('adults', false)}
                disabled={passengers.adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{passengers.adults}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('adults', true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Children</div>
              <div className="text-sm text-gray-300">2 - 11</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('children', false)}
                disabled={passengers.children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{passengers.children}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('children', true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Infants</div>
              <div className="text-sm text-gray-300">Under 2</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('infants', false)}
                disabled={passengers.infants <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{passengers.infants}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
                onClick={() => updateCount('infants', true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Done Button */}
          <div className="pt-2">
            <PopoverTrigger asChild>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                Done
              </Button>
            </PopoverTrigger>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerModal;