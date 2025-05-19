// QRCodeSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { baseAPI } from "@/constants/api";
import { Maximize2, X, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface QRCodeSectionProps {
  sessionId?: number;
}

export function QRCodeSection({
  sessionId = 6, // Default to 6 as specified
}: QRCodeSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("15:00");
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate QR code
  const generateQRCode = async () => {
    setIsLoading(true);
    try {
      // Use the fixed session ID as specified
      const qrUrl = `/api/images/generate-qr-image/6`;

      // Add timestamp parameter to prevent caching and get a fresh QR code
      const urlWithTimestamp = `${qrUrl}?t=${new Date().getTime()}`;

      // Set QR code image URL
      setQrImageUrl(urlWithTimestamp);

      // Set expiry time to 15 minutes from now
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);
      setExpiryTime(expiry);

      setQrGenerated(true);
      setIsExpired(false);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect to update countdown
  useEffect(() => {
    if (!expiryTime || isExpired) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = Math.max(
        0,
        Math.floor((expiryTime.getTime() - now.getTime()) / 1000)
      );

      if (diff <= 0) {
        setIsExpired(true);
        setTimeRemaining("00:00");
        clearInterval(intervalId);
      } else {
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setTimeRemaining(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTime, isExpired]);

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Attendance - QR Code
        </CardTitle>
        <Button
          variant="outline"
          className={`${
            isExpired || !qrGenerated ? "bg-amber-500" : "bg-blue-500"
          } ${
            !qrGenerated ? "hover:bg-amber-400" : "hover:bg-blue-700"
          } text-white hover:text-white border-0`}
          onClick={generateQRCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : null}
          {isExpired ? "Regenerate" : qrGenerated ? "Refresh" : "Generate"} QR
          Code
        </Button>
      </CardHeader>
      <CardContent>
        {qrGenerated && (
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className="border border-dashed border-gray-300 inline-block cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative">
                {/* Display QR code image from API */}
                {qrImageUrl && (
                  <div className="relative">
                    <img
                      src={baseAPI.BASE_IMAGE + qrImageUrl}
                      alt="Attendance QR Code"
                      width={200}
                      height={200}
                      className={isExpired ? "opacity-30" : ""}
                    />
                    {isExpired && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Expired
                        </span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-white rounded-full h-6 w-6 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-sm">
              QR code will expire in:{" "}
              <span
                className={`${
                  isExpired
                    ? "text-red-500"
                    : timeRemaining.startsWith("00")
                    ? "text-orange-500"
                    : "text-green-500"
                } font-medium`}
              >
                {timeRemaining}
              </span>
            </div>
            {isExpired && (
              <Button
                variant="outline"
                className="mt-2 text-sm bg-amber-500 hover:bg-amber-600 text-white border-0"
                onClick={generateQRCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Generate New QR Code
              </Button>
            )}
          </div>
        )}
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>View Attendance - QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="border border-dashed border-gray-300 inline-block">
              {qrImageUrl && (
                <div className="relative">
                  <img
                    src={baseAPI.BASE_IMAGE + qrImageUrl}
                    alt="Attendance QR Code"
                    width={1080}
                    height={1080}
                    className={isExpired ? "opacity-30" : ""}
                  />
                  {isExpired && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                        Expired
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 text-sm ">
              QR code will expire in:{" "}
              <span
                className={`${
                  isExpired
                    ? "text-red-500"
                    : timeRemaining.startsWith("00")
                    ? "text-orange-500"
                    : "text-green-500"
                } font-medium`}
              >
                {timeRemaining}
              </span>
            </div>
            {isExpired && (
              <Button
                variant="outline"
                className="mt-2 text-sm bg-amber-500 hover:bg-amber-600 text-white border-0"
                onClick={generateQRCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Generate New QR Code
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
