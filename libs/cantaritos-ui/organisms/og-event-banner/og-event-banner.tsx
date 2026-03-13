"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocaleStore, useTranslation } from "@/domain/stores";

export function OgEventBanner() {
  const { translate } = useTranslation();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <section className="w-full min-h-[588px] lg:h-[872px] bg-[url('/images/vector.png')] bg-top bg-no-repeat bg-cover mt-[50px] md:mt-0">
      <div className="mx-auto px-6 md:px-10 xl:px-[206px] pt-[126px] md:pt-[18vw] lg:pt-[200px] pb-10 md:pb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Title */}
          <h2 className="order-1 md:hidden font-heading text-2xl leading-tight text-[#1E293B] text-center">
            {locale === "es" ? (
              <>
                SI NO VIENES{" "}AL{" "}
                <span className="text-[#E9DCB7] font-extrabold">G<span className="mr-[4px]">Ü</span>ERO,</span>
                <br />
                EL G<span className="mr-[2px]">Ü</span>ERO VA
                <br />
                <span className="text-[#FFAF32] font-extrabold">CONTIGO.</span>
              </>
            ) : (
              <>
                CAN&apos;T MAKE IT TO THE{" "}
                <span className="text-[#E9DCB7] font-extrabold">G<span className="mr-[4px]">Ü</span>ERO?</span>
                <br />
                WE&apos;LL BRING THE G<span className="mr-[2px]">Ü</span>ERO
                <br />
                <span className="text-[#FFAF32] font-extrabold">TO YOU.</span>
              </>
            )}
          </h2>

          {/* Card image - after title on mobile, right side on desktop */}
          <div className="order-2 md:order-2 flex flex-col items-center md:-mt-[90px]">
            <div className="relative w-[220px] h-[220px] md:w-[436px] md:h-[453px]">
              <Image
                src="/images/card_1.png"
                alt="Carrito Cantaritos El Guero"
                fill
                className="object-contain"
              />
            </div>

            {/* Button + hand - visible only on desktop here */}
            <div className="hidden md:flex justify-center mt-[34px]">
              <div className="relative">
                <Link
                  href="/cotizar-evento"
                  className="inline-block bg-[#1E293B] text-white font-body font-bold text-sm md:text-base px-8 py-3 rounded-full hover:bg-[#334155] transition-colors"
                >
                  {translate("eventBanner.button")}
                </Link>
                <Image
                  src="/images/point_out.png"
                  alt=""
                  width={108}
                  height={108}
                  className="absolute right-[-120px] top-[20px]"
                />
              </div>
            </div>
          </div>

          {/* Left content - desktop has title + description together */}
          <div className="order-3 md:order-1 flex-1 space-y-6">
            <h2 className="hidden md:block font-heading md:text-4xl lg:text-[56px] leading-none tracking-normal text-[#1E293B]">
              {locale === "es" ? (
                <>
                  SI NO VIENES
                  <br />
                  AL{" "}
                  <span className="text-[#E9DCB7] font-extrabold">G<span className="mr-[2px]">Ü</span>ERO,</span>
                  <br />
                  EL G<span className="mr-[2px]">Ü</span>ERO VA
                  <br />
                  <span className="text-[#FFAF32] font-extrabold">CONTIGO.</span>
                </>
              ) : (
                <>
                  CAN&apos;T MAKE IT
                  <br />
                  TO THE{" "}
                  <span className="text-[#E9DCB7] font-extrabold">G<span className="mr-[2px]">Ü</span>ERO?</span>
                  <br />
                  WE&apos;LL BRING THE G<span className="mr-[2px]">Ü</span>ERO
                  <br />
                  <span className="text-[#FFAF32] font-extrabold">TO YOU.</span>
                </>
              )}
            </h2>

            <p className="text-[#1E293B] font-body font-medium text-sm md:text-[24px] md:leading-snug max-w-[380px] md:max-w-[480px] text-center md:text-left">
              <span className="md:hidden">
                {translate("eventBanner.descLine1")}<br />
                {translate("eventBanner.descLine2")}<br />
                {translate("eventBanner.descLine3")}
              </span>
              <span className="hidden md:inline">
                {translate("eventBanner.descFull")}
              </span>
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start -ml-20 md:-ml-[50px]">
              <Image
                src="/images/cantarito.png"
                alt="Cantarito"
                width={154}
                height={156}
                className="shrink-0 w-[80px] h-[81px] md:w-[154px] md:h-[156px]"
              />
              <p className="text-white font-body font-bold text-xs leading-none md:text-base md:leading-normal max-w-[280px]">
                {translate("eventBanner.ctaLine1")}
                <br />
                {translate("eventBanner.ctaLine2")}
              </p>
            </div>
          </div>

          {/* Button + hand - mobile only, at the bottom */}
          <div className="order-4 md:hidden flex justify-center">
            <div className="relative">
              <Link
                href="/cotizar-evento"
                className="flex items-center justify-center w-[111px] h-[28px] bg-[#1E293B] text-white font-body font-bold text-[10px] rounded-full hover:bg-[#334155] transition-colors"
              >
                {translate("eventBanner.button")}
              </Link>
              <Image
                src="/images/point_out.png"
                alt=""
                width={50}
                height={50}
                className="absolute right-[-64px] top-[8px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
