"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/routes";
import {
  clearRoles,
  getRoleCheck,
  getRoleCheckGrope,
} from "@/utils/local-storage/user-info/roles";
import { clearUserId } from "@/utils/local-storage/user-info/userId";
import { clearUsername } from "@/utils/local-storage/user-info/username";
import { logoutUser } from "@/utils/local-storage/user-info/token";
import { ConfirmDialog } from "../shared/custom-confirm-dialog";
import { MobileSidebar } from "./mobile-sidebar";
import { RoleEnum } from "@/constants/constant";

export function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // state to open/close confirm dialog
  const router = useRouter();

  const getProfileUrl = () => {
    const roleGroup = getRoleCheck();

    console.log("##Role: ", roleGroup);

    switch (roleGroup) {
      case RoleEnum.ADMIN:
        return "/profile/admin";
      case RoleEnum.DEVELOPER:
      case RoleEnum.TEACHER:
      case RoleEnum.STAFF:
        return "/profile/teacher";
      case RoleEnum.STUDENT:
        return "/profile/student";
      default:
        return "/unauthorized";
    }
  };

  const profileUrl = getProfileUrl();

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    clearUserId();
    clearRoles();
    clearUsername();
    logoutUser();
    router.push(ROUTE.AUTH.LOGIN);
  };

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-[#024D3E] px-4 md:px-6">
        {/* Left: Logo or Sidebar toggle */}
        <div className="flex items-center">
          {isMobile && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <Link href="/" className="flex items-center ml-2 gap-2">
                <div className="rounded-full bg-white p-1"></div>
                <span className="font-bold text-white text-lg">KSIT</span>
              </Link>
            </>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-[#033d31]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 border-2 border-gray-200">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Regadmin</span>
                  <span className="text-xs text-gray-500">Super Admin</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(profileUrl)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(ROUTE.USERS.SETTING_CHANGE_PASSWORD)}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Open confirm dialog on Logout click */}
              <DropdownMenuItem onClick={() => setConfirmOpen(true)}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-11/12 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <MobileSidebar isOpen={true} onClose={toggleMobileMenu} />
        </div>
      )}

      {/* Confirm Logout Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
}
