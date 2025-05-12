"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MajorModel } from "@/model/major/major-model";
import { debounce } from "@/utils/debounce/debounce";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { StatusEnum } from "@/constants/constant";
import { getAllMajorService } from "@/service/major.service";

interface ComboboxSelectedProps {
  dataSelect: MajorModel | null;
  onChangeSelected: (item: MajorModel) => void; // Callback to notify parent about the selection change
}

export function ComboboxSelectMajor({
  dataSelect,
  onChangeSelected,
}: ComboboxSelectedProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    dataSelect?.name || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MajorModel[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Intersection Observer Hook
  const { ref, inView } = useInView({ threshold: 1 });

  // Fetch data from API
  const fetchData = async (search = "", newPage = 1) => {
    if (loading || lastPage) return;
    setLoading(true);
    try {
      const result = await getAllMajorService({
        search,
        pageSize: 10,
        pageNo: newPage,
        status: StatusEnum.ACTIVE,
      });

      if (newPage === 1) {
        setData(result.content);
      } else {
        setData((prev) => [...prev, ...result.content]);
      }
      setPage(result.pageNo);
      setLastPage(result.last);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle search input with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData(searchTerm, 1);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // Load more when last item is visible
  useEffect(() => {
    if (inView && !lastPage && !loading) {
      fetchData(searchTerm, page + 1);
    }
  }, [inView]);

  // Update selected value when dataSelect changes
  useEffect(() => {
    setSelectedValue(dataSelect?.name || "");
  }, [dataSelect]);

  async function onChangeSearch(value: string) {
    setSearchTerm(value);
    onSearchClick(value);
  }

  const onSearchClick = useCallback(
    debounce(async (value: string) => {
      fetchData(value);
    }),
    [searchTerm]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-8 flex-1 justify-between"
        >
          {selectedValue
            ? data.find((item) => item.name === selectedValue)?.name
            : "Select an branch..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full flex p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchTerm}
            onValueChange={onChangeSearch}
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {data?.map((item, index) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const selectedItem = data.find(
                      (item) => item.name === currentValue
                    );
                    if (selectedItem) {
                      setSelectedValue(currentValue);
                      onChangeSelected(selectedItem); // Notify parent about the change
                    }
                    setOpen(false);
                  }}
                  ref={index === data.length - 1 ? ref : null} // Attach observer to last item
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Loading spinner */}
            {loading && (
              <div className="text-center py-2">
                <Loader2 className="animate-spin text-gray-500 h-5 w-5 mx-auto" />
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
