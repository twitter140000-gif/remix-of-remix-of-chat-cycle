import { Database, Settings, Shield, User } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    icon: User,
    label: "ایجاد حساب صاحب سیستم (OWNER)",
    description: "تنها کاربر اصلی با دسترسی مدیریت کامل سامانه",
  },
  {
    icon: Shield,
    label: "تعریف نقش‌ها و دسترسی‌ها",
    description: "مشخص کردن سطح دسترسی هر نقش در سیستم",
  },
  {
    icon: Database,
    label: "پیکربندی پایگاه داده",
    description: "آماده‌سازی جداول و تنظیمات اولیه",
  },
  {
    icon: Settings,
    label: "شروع به کار برنامه",
    description: "ورود به سامانه و استفاده از امکانات",
  },
];

/**
 * First-run setup screen shown when the system is NOT_INITIALIZED.
 *
 * This is a frontend-only placeholder; it does not create users, roles,
 * permissions, or perform any database writes.
 */
export function FirstRunSetup() {
  return (
    <div className="safe-top safe-bottom relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-primary opacity-25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-primary opacity-20 blur-3xl"
      />

      <Card className="app-card relative w-full max-w-lg shadow-2xl">
        <CardHeader className="items-center gap-4 text-center">
          <Logo className="size-20 rounded-2xl shadow-[var(--shadow-glow)] ring-1 ring-on-hero/25" />
          <div>
            <CardTitle className="font-display text-3xl">دز رکاب</CardTitle>
            <CardDescription className="mt-1 text-base">
              راه‌اندازی اولیه سامانه
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-xl bg-primary-soft/50 p-4 text-center">
            <p className="text-sm font-semibold text-foreground">
              سیستم هنوز راه‌اندازی نشده است.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              مراحل زیر باید تکمیل شوند تا سامانه قابل استفاده باشد.
            </p>
          </div>

          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li
                key={step.label}
                className="flex items-start gap-3 rounded-xl border bg-card/50 p-3"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    <span className="ml-1.5 inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button className="w-full" size="lg" disabled>
            شروع راه‌اندازی
          </Button>
          <p className="text-xs text-muted-foreground">
            این بخش در مرحله بعدی پیاده‌سازی فعال می‌شود.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
