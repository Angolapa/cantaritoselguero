"use client";

import Image from "next/image";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import { useTranslation } from "@/domain/stores/locale-store";

export default function NosotrosPage() {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-[#EDDCB6] flex flex-col">
      <OgNavbar />

      <main className="flex-1">
        {/* Origen cantarístico */}
        <section className="px-6 pt-8 flex flex-col items-start">
          <h1 className="font-heading text-2xl leading-none text-primary uppercase mb-2">
            {translate("about.heroTitle1")}
            <br />
            {translate("about.heroTitle2")}
          </h1>
          <div className="relative inline-flex items-center justify-center mb-3">
            <Image
              src="/images/yellow-ribbon.png"
              alt=""
              width={200}
              height={50}
              className="w-[180px] h-auto"
            />
            <p className="absolute font-heading text-2xl leading-none text-[#14222F]">
              {translate("about.since")}
            </p>
          </div>
          <p className="font-body text-xs font-bold leading-tight text-[#14222F] mb-4">
            {translate("about.sinceDescLine1")}
            <br />
            {translate("about.sinceDescLine2")}
            <br />
            {translate("about.sinceDescLine3")}
          </p>
          <Image
            src="/images/Origen del güero.png"
            alt={translate("about.heroImageAlt")}
            width={243}
            height={288}
            className="w-[243px] h-auto self-center"
          />
        </section>

        {/* Cantaritos El Güero #1 */}
        <section className="px-6 pt-6 flex flex-col items-start">
          <h2 className="font-heading text-2xl leading-none text-primary uppercase mb-4">
            Cantaritos
            <br />
            El Güero #1
          </h2>
          <div className="relative inline-flex flex-col mb-2">
            <p className="font-body text-xs font-medium leading-tight text-[#14222F]">
              {translate("about.gueroIntro")}
            </p>
            <Image
              src="/images/arrow-down.jpg"
              alt=""
              width={24}
              height={48}
              className="absolute -right-6 top-2 w-[20px] h-auto"
            />
            <p className="font-body text-base font-bold leading-none text-[#14222F] mt-4">
              {translate("about.gueroQuote")}
            </p>
          </div>
          <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-6">
            {translate("about.gueroDescLine1")}
            <br />
            {translate("about.gueroDescLine2")}
            <br />
            {translate("about.gueroDescLine3")}
          </p>
          <Image
            src="/images/celebration-agave.png"
            alt="Celebración con agave"
            width={300}
            height={350}
            className="w-[260px] h-auto self-center mb-8"
          />
          <p className="font-body text-base font-bold leading-tight text-[#14222F] text-center self-center mb-6">
            {translate("about.gueroClosing")}
          </p>
        </section>

        {/* Y esa referencia, en ritual */}
        <section className="flex flex-col items-center">
          {/* Cinta roja con título */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <Image
              src="/images/red-ribbon.png"
              alt=""
              width={335}
              height={83}
              className="w-[335px] h-auto"
            />
            <p className="absolute font-heading text-2xl leading-none text-[#FFAF32] text-center -mt-5">
              {translate("about.ritualTitle")}
            </p>
          </div>

          {/* Cantarito Gigante */}
          <Image
            src="/images/cantarito-gigante.png"
            alt="Cantarito Gigante"
            width={322}
            height={391}
            className="w-[322px] h-auto mb-6 -mt-4"
          />

          {/* Textos descriptivos */}
          <div className="px-6 flex flex-col items-center w-full text-center">
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc1Line1")}
              <br />
              {translate("about.ritualDesc1Line2")}
              <br />
              {translate("about.ritualDesc1Line3")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc2Line1")}
              <br />
              {translate("about.ritualDesc2Line2")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc3")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-6">
              {translate("about.ritualDesc4Line1")}
              <br />
              {translate("about.ritualDesc4Line2")}
            </p>
          </div>
        </section>

        {/* La fórmula */}
        <section className="px-6 py-6 text-center">
          <h2 className="font-heading text-2xl leading-none text-primary mb-6">
            {translate("about.formulaTitle")}
          </h2>

          {/* 4 pilares - grid 2x2 */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/cantarito-tradition.png"
                  alt={translate("about.pillarTradition")}
                  width={135}
                  height={167}
                  className="w-[135px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarTradition")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/dancing-women.png"
                  alt={translate("about.pillarAmbience")}
                  width={99}
                  height={149}
                  className="w-[99px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarAmbience")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/charisma-vendor.png"
                  alt={translate("about.pillarCharisma")}
                  width={100}
                  height={155}
                  className="w-[100px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarCharisma")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/tuba-musician.png"
                  alt={translate("about.pillarLiveMusic")}
                  width={127}
                  height={168}
                  className="w-[127px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarLiveMusic")}
              </p>
            </div>
          </div>
        </section>

        {/* Amatitán */}
        <section className="flex flex-col items-center px-6">
          <Image
            src="/images/amatitan-sign.png"
            alt="Señal de Amatitán"
            width={280}
            height={160}
            className="w-[240px] h-auto mb-8"
          />

          <p className="font-body text-xs font-medium leading-tight text-[#14222F] text-center mb-4">
            {translate("about.amatitanDesc1Line1")}
            <br />
            {translate("about.amatitanDesc1Line2")}
          </p>
          <p className="font-body text-xs font-medium leading-tight text-[#14222F] text-center mb-4">
            {translate("about.amatitanDesc2Line1")}
            <br />
            {translate("about.amatitanDesc2Line2")}
            <br />
            {translate("about.amatitanDesc2Line3")}
          </p>
          <p className="font-body text-base font-bold leading-tight text-primary text-center mb-6">
            {translate("about.amatitanClosingLine1")}
            <br />
            {translate("about.amatitanClosingLine2")}
          </p>

          {/* Banner verde */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <Image
              src="/images/green-banner.png"
              alt=""
              width={311}
              height={146}
              className="w-[311px] h-auto"
            />
            <p className="absolute font-body text-xs font-bold leading-none text-white text-center w-[233px] -mt-14">
              {translate("about.bannerLine1")} {translate("about.bannerLine2")} {translate("about.bannerLine3")}
            </p>
          </div>
        </section>

        {/* Propósito */}
        <section
          className="bg-no-repeat bg-top bg-cover"
          style={{ backgroundImage: "url('/images/Fondo cerro.png')" }}
        >
          <div className="flex flex-col items-center text-center mx-auto max-w-[355px] px-4 pt-46 pb-10">
            {/* Corazón + Propósito */}
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/heart.png"
                alt=""
                width={30}
                height={26}
                className="w-[30px] h-auto"
              />
              <h2 className="font-heading text-2xl leading-none text-[#14222F] uppercase">
                {translate("about.purposeTitle")}
              </h2>
            </div>

            <p className="font-body text-xs font-medium leading-tight text-white mb-8 max-w-xs">
              {translate("about.purposeDesc")}
            </p>

            {/* Mano saludando */}
            <Image
              src="/images/hand-wave.png"
              alt=""
              width={60}
              height={50}
              className="w-[50px] h-auto mb-6"
            />

            <p className="font-body text-base font-bold leading-tight text-white mb-2">
              {translate("about.soulLine1")}
              <br />
              {translate("about.soulLine2")}
            </p>

            <p className="font-body text-base font-bold leading-tight text-primary mb-6">
              {translate("about.soulGrowth")}
            </p>

            {/* Bota vaquera */}
            <Image
              src="/images/cowboy-boot.png"
              alt=""
              width={60}
              height={60}
              className="w-[50px] h-auto"
            />
          </div>
        </section>

        {/* Mood cantarístico */}
        <section className="flex flex-col items-center gap-[33px] px-5 pt-10 pb-[60px] bg-primary">
          <h2 className="font-heading text-2xl leading-none text-[#EDDCB6] text-center">
            {translate("about.moodTitle")}
          </h2>
          <div className="flex gap-4 justify-center">
            <div className="flex items-center justify-center w-[160px] h-[223px] p-[10px] shrink-0">
              <Image
                src="/images/mood-photo-1.png"
                alt="Cantaritos en evento"
                width={140}
                height={203}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex items-center justify-center w-[160px] h-[223px] p-[10px] shrink-0">
              <Image
                src="/images/mood-photo-2.png"
                alt="Preparación de cantarito"
                width={140}
                height={203}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </section>
      </main>

      <OgFooter />
    </div>
  );
}
