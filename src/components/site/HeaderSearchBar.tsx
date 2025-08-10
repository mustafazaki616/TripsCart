import * as React from "react";
import { format } from "date-fns";
import { ArrowLeftRight, Calendar, Plane, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { cities } from "./flightOptions";

const HeaderSearchBar: React.FC = () => {
  const [swapAnim, setSwapAnim] = React.useState(false);
  const [openDepart, setOpenDepart] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [data, setData] = React.useState({
    origin: undefined as string | undefined,
    destination: undefined as string | undefined,
    departDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: 1,
  });

  const swap = () => {
    setSwapAnim(true);
    setData((d) => ({ ...d, origin: d.destination, destination: d.origin }));
    setTimeout(() => setSwapAnim(false), 500);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Searching tickets", {
      description: `${data.origin ?? "-"} → ${data.destination ?? "-"} • ${data.passengers} pax`,
    });
  };

  return (
    <form onSubmit={submit} className="rounded-xl bg-card/90 backdrop-blur border shadow-soft p-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Origin */}
        <div className="lg:col-span-3">
          <label className="sr-only">From</label>
          <div className="relative">
            <Select value={data.origin} onValueChange={(v) => setData((d) => ({ ...d, origin: v }))}>
              <SelectTrigger className="h-10 bg-secondary/60">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cities.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Plane className="absolute right-3 top-2.5 opacity-60" />
          </div>
        </div>
        {/* Swap */}
        <div className="hidden lg:flex items-center justify-center">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={swap}
            aria-label="Swap origin and destination"
            className={cn("rounded-full", swapAnim && "animate-spin")}
          >
            <ArrowLeftRight />
          </Button>
        </div>
        {/* Destination */}
        <div className="lg:col-span-3">
          <label className="sr-only">To</label>
          <div className="relative">
            <Select value={data.destination} onValueChange={(v) => setData((d) => ({ ...d, destination: v }))}>
              <SelectTrigger className="h-10 bg-secondary/60">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cities.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Plane className="absolute right-3 top-2.5 opacity-60 rotate-180" />
          </div>
        </div>
        {/* Depart */}
        <div className="lg:col-span-2">
          <label className="sr-only">Departure</label>
          <Popover open={openDepart} onOpenChange={setOpenDepart}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-10 bg-secondary/60">
                <Calendar className="mr-2 opacity-70" />
                {data.departDate ? format(data.departDate, "EEE, dd MMM") : "Depart"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <CalendarWidget
                mode="single"
                selected={data.departDate}
                onSelect={(d) => setData((s) => ({ ...s, departDate: d ?? undefined }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Return */}
        <div className="lg:col-span-2">
          <label className="sr-only">Return</label>
          <Popover open={openReturn} onOpenChange={setOpenReturn}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-10 bg-secondary/60">
                <Calendar className="mr-2 opacity-70" />
                {data.returnDate ? format(data.returnDate, "EEE, dd MMM") : "Return"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <CalendarWidget
                mode="single"
                selected={data.returnDate}
                onSelect={(d) => setData((s) => ({ ...s, returnDate: d ?? undefined }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Pax + submit */}
        <div className="lg:col-span-1">
          <label className="sr-only">Passengers</label>
          <div className="flex items-center gap-2 h-10 bg-secondary/60 rounded-md px-3">
            <UserRound className="opacity-70" />
            <span className="sr-only">Passengers</span>
            <button
              type="button"
              className="text-sm opacity-80"
              onClick={() => setData((d) => ({ ...d, passengers: Math.max(1, d.passengers - 1) }))}
              aria-label="Decrease passengers"
            >
              -
            </button>
            <span className="flex-1 text-center text-sm">{data.passengers}</span>
            <button
              type="button"
              className="text-sm opacity-80"
              onClick={() => setData((d) => ({ ...d, passengers: d.passengers + 1 }))}
              aria-label="Increase passengers"
            >
              +
            </button>
          </div>
        </div>
        <div className="lg:col-span-1 flex items-stretch">
          <Button type="submit" variant="hero" className="w-full h-10">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchBar;
