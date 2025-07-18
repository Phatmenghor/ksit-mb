"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Bell,
  Edit,
  LogOut,
  Menu,
  SettingsIcon,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
} from "@/utils/local-storage/user-info/roles";
import { clearUserId } from "@/utils/local-storage/user-info/userId";
import { clearUsername } from "@/utils/local-storage/user-info/username";
import { logoutUser } from "@/utils/local-storage/user-info/token";
import { ConfirmDialog } from "../shared/custom-confirm-dialog";
import { MobileSidebar } from "./mobile-sidebar";
import { RoleEnum } from "@/constants/constant";
import Image from "next/image";
import { AppIcons, AppResource } from "@/constants/icons/icon";
import { getStaffByTokenService } from "@/service/user/user.service";
import { StaffModel } from "@/model/user/staff/staff.respond.model";

export function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // state to open/close confirm dialog
  const [user, setUser] = useState<any | undefined>(undefined);
  const router = useRouter();

  const getProfileUrl = () => {
    const roleGroup = getRoleCheck();

    switch (roleGroup) {
      case RoleEnum.ADMIN:
        return ROUTE.PROFILE.ADMIN;
      case RoleEnum.DEVELOPER:
      case RoleEnum.TEACHER:
      case RoleEnum.STAFF:
        return ROUTE.PROFILE.TEACHER;
      case RoleEnum.STUDENT:
        return ROUTE.PROFILE.STUDENT;
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

  const fetchUser = async () => {
    try {
      const response = await getStaffByTokenService();
      console.log("fetch user profile by token: ", response);

      setUser(response?.profileUrl);
    } catch (error) {
      console.log("Error to fetch user profile: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header
        className={`flex items-center justify-between bg-[#024D3E] px-4 md:px-6 ${
          isMobile ? "h-20" : "h-16"
        }`}
      >
        {/* Left: Logo or Sidebar toggle */}
        <div className="flex items-center">
          {isMobile && (
            <>
              <Button
                variant="ghost"
                asChild
                size="icon"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <img
                    src={AppIcons.menu}
                    alt="menu Icon"
                    className="h-3 w-4 mr-3 sm:mr-5 text-muted-foreground"
                  />
                )}
              </Button>
              <Link href="/" className="flex items-center ml-2 gap-2">
                <div className="relative h-12 w-12">
                  <Image
                    src={AppResource.Logo}
                    alt="KSIT Logo"
                    fill
                    className="rounded-full object-contain"
                    priority
                  />
                </div>
                <span className="font-bold text-white text-lg">KSIT</span>
              </Link>
            </>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* User avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                asChild
                size="icon"
                className="rounded-full hover:bg-none hover:cursor-pointer"
              >
                <Avatar className="h-8 w-8 border-2">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}${user}`}
                    alt="User"
                  />
                  <AvatarFallback>USER</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => router.push(profileUrl)}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => router.push(profileUrl + "/edit")}
              >
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => router.push(ROUTE.USERS.SETTING_CHANGE_PASSWORD)}
              >
                <div className="flex items-center">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => setConfirmOpen(true)}
              >
                <div className="flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </div>
                <ArrowRight className="h-4 w-4 text-red-600" />
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
