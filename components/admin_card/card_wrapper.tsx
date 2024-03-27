"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  desc: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  desc,
}: CardWrapperProps) => {
  return (
    <Card className="w-[90vw] lg:w-[44vw] shadow-md max-h-max">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
