"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/react";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FaqItem[] = [
  {
    question: "¿Dónde están ubicados?",
    answer: (
      <div className="space-y-2">
        <p>
          Carretera Internacional libre Guadalajara - Tepic, km 49, #4970, La
          Meza, 45380, Amatitán, Jal. A 45 minutos de Guadalajara.
        </p>
        <p>
          <strong>Mapa directo:</strong>
          <br />
          <a
            href="https://maps.app.goo.gl/Ef6Z6TD3qLw1vsAV9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            https://maps.app.goo.gl/Ef6Z6TD3qLw1vsAV9
          </a>
        </p>
        <p>
          Estamos en el corazón de Amatitán, dentro de la Ruta del Tequila.
        </p>
      </div>
    ),
  },
  {
    question: "¿Cuál es su horario?",
    answer: (
      <div className="space-y-2">
        <p>Abrimos los 365 días del año, de 9:00 a.m. a 12:00 a.m.</p>
        <p>
          La música en vivo comienza todos los días a partir de la 1:00 p.m.
        </p>
      </div>
    ),
  },
  {
    question: "¿Hay estacionamiento?",
    answer: (
      <p>
        Sí contamos con área de estacionamiento para nuestros visitantes (autos
        y autobuses).
      </p>
    ),
  },
  {
    question: "¿Necesito reservación?",
    answer: (
      <div className="space-y-2">
        <p>
          No necesitas reservación para vivir la experiencia Cantarística.
        </p>
        <p>Siempre hay espacio para empezar la fiesta.</p>
      </div>
    ),
  },
  {
    question: "¿Cómo funcionan las reservaciones para grupos grandes?",
    answer: (
      <div className="space-y-2">
        <p>
          Las reservaciones están disponibles para grupos grandes (recomendado
          para 60 personas o más).
        </p>
        <p>
          <strong>Requisitos:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Llegar antes de las 3:00 p.m.</li>
          <li>Consumo anticipado mínimo de $10,000 MXN</li>
          <li>
            El monto total se aplica al consumo del grupo el día de la visita
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "¿Reciben grupos de autobuses o tours?",
    answer: (
      <div className="space-y-2">
        <p>Sí, nos encanta recibir grupos.</p>
        <p>
          Si traes un grupo de más de 45 personas en autobús, al finalizar su
          visita obsequiamos una botella de tequila al coordinador del grupo como
          agradecimiento. (Aplica únicamente para el coordinador y se entrega en
          zona de cajas).
        </p>
      </div>
    ),
  },
  {
    question: "¿Venden comida?",
    answer: (
      <p>
        Sí. Contamos con tacos, alitas, botanas y más opciones para acompañar la
        experiencia.
      </p>
    ),
  },
  {
    question: "¿Puedo llevar pastel de cumpleaños?",
    answer: (
      <div className="space-y-2">
        <p>
          En nuestro menú contamos con pasteles para compartir con tus compas.
        </p>
        <p>
          No está permitido el ingreso con alimentos o bebidas ajenas al
          establecimiento.
        </p>
      </div>
    ),
  },
  {
    question: "¿Tienen opciones sin alcohol?",
    answer: (
      <p>
        Sí. Contamos con cantaritos sin alcohol para los peques o conductor
        designado.
      </p>
    ),
  },
  {
    question: "¿Tienen menú?",
    answer: (
      <p>
        Sí. Puedes consultar el menú completo en la sección Menú del sitio.
      </p>
    ),
  },
  {
    question: "¿Puedo ingresar con alimentos o bebidas externas?",
    answer: (
      <p>
        No está permitido ingresar con alimentos o bebidas ajenas al
        establecimiento.
      </p>
    ),
  },
  {
    question: "¿Hay música en vivo?",
    answer: (
      <div className="space-y-2">
        <p>
          Sí. Tenemos música en vivo todos los días a partir de la 1:00 p.m.
        </p>
        <p>
          Las agrupaciones se pueden contactar directamente en sitio.
        </p>
      </div>
    ),
  },
  {
    question: "¿Qué es el Cantarito Gigante?",
    answer: (
      <div className="space-y-2">
        <p>Es nuestro ícono.</p>
        <p>
          Una creación original que transforma el cantarito tradicional en un
          ritual colectivo para compartir.
        </p>
      </div>
    ),
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: (
      <div className="space-y-2">
        <p>Aceptamos:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Efectivo</li>
          <li>Tarjeta Visa y Mastercard</li>
          <li>
            Transferencias únicamente directamente en caja al momento de pago.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "¿Cómo puedo facturar?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Cantaritos y botanas:</strong>
          <br />
          <a
            href="https://admin.softrestaurant.com/cantaritoselguero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            https://admin.softrestaurant.com/cantaritoselguero
          </a>
        </p>
        <p>
          <strong>Alimentos del restaurante (negocio independiente):</strong>
          <br />
          <a
            href="https://mefacturo.mx/restauranteymariscoscantaritoselguero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            https://mefacturo.mx/restauranteymariscoscantaritoselguero
          </a>
        </p>
        <p>
          <strong>Contacto restaurante:</strong>
          <br />
          josh.venegas@icloud.com
          <br />
          +52 1 374 117 3367
          <br />
          <a
            href="https://www.restaurantecantaritoselguero.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            https://www.restaurantecantaritoselguero.com/
          </a>
        </p>
        <p>
          Si tienes problemas para generar tu factura de Cantaritos y botanas,
          envíanos al correo facturacion@cantaritoselguero.mx
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Foto legible de tickets</li>
          <li>Constancia de situación fiscal</li>
          <li>Método de pago utilizado</li>
          <li>Correo electrónico para envío</li>
        </ol>
      </div>
    ),
  },
  {
    question: "¿Pueden ingresar menores de edad?",
    answer: (
      <p>
        Sí. Somos un ambiente familiar y los menores son bienvenidos.
      </p>
    ),
  },
  {
    question: "¿Puedo entrar con mascotas?",
    answer: (
      <p>
        Sí. Solo pedimos responsabilidad del dueño, ya que contamos con perritos
        en el lugar.
      </p>
    ),
  },
  {
    question: "¿Hay alguna política de acceso importante?",
    answer: (
      <div className="space-y-2">
        <p>No está permitido ingresar con:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Alimentos o bebidas externas</li>
          <li>Objetos peligrosos</li>
        </ul>
        <p>
          Nos reservamos el derecho de admisión para garantizar la seguridad y la
          experiencia de todos.
        </p>
      </div>
    ),
  },
  {
    question: "¿Cuentan con transporte propio?",
    answer: (
      <div className="space-y-2">
        <p>
          Sí. Contamos con nuestro transporte oficial La Ruta del Güero.
        </p>
        <p>
          Puedes consultar horarios y disponibilidad aquí:{" "}
          <a href="/ruta-al-guero" className="text-primary underline">
            [Link]
          </a>
        </p>
        <p>
          También puedes revisar el directorio de agencias que ofrecen tours
          hacia Cantaritos El Güero #1 y la Ruta del Tequila.
        </p>
        <p>
          A las afueras de Cantaritos encontrarás conductores que ofrecen
          servicio tipo Uber; el costo y condiciones se cotiza directamente con
          ellos.
        </p>
        <p>
          <strong>Importante:</strong>
        </p>
        <p>
          Las agencias de tours y los servicios de transporte externos son ajenos
          a Cantaritos El Güero, por lo que no nos hacemos responsables por su
          operación, tarifas o servicio.
        </p>
      </div>
    ),
  },
  {
    question: "¿Qué pasa si olvidé un objeto?",
    answer: (
      <div className="space-y-2">
        <p>Envíanos:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Descripción detallada</li>
          <li>Día y hora aproximada</li>
          <li>Zona donde lo dejaste</li>
          <li>Foto (si tienes)</li>
        </ol>
        <p>
          Si el objeto fue resguardado, podrás recogerlo en horario de
          operación.
        </p>
        <p>
          Si no hay registro, no podremos garantizar su recuperación. No nos
          hacemos responsables por objetos perdidos.
        </p>
      </div>
    ),
  },
  {
    question: "¿Cómo puedo enviar mi solicitud de empleo?",
    answer: (
      <div className="space-y-2">
        <p>
          Envía tu solicitud y currículum a:
          <br />
          <a
            href="mailto:empleados@cantaritoselguero.mx"
            className="text-primary underline"
          >
            empleados@cantaritoselguero.mx
          </a>
        </p>
        <p>
          Nuestro equipo revisará tu información y se pondrá en contacto si hay
          vacantes compatibles.
        </p>
      </div>
    ),
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    const query = searchQuery.toLowerCase();
    return faqData.filter((faq) =>
      faq.question.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <OgNavbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-white dark:bg-gray-900 px-6 pt-8 pb-4">
          <div className="max-w-4xl mx-auto flex items-center justify-start">
            <div className="relative inline-block">
              {/* Speech bubble bg */}
              <div className="relative">
                <Image
                  src="/images/bg1.png"
                  alt=""
                  width={500}
                  height={300}
                  className="w-[260px] md:w-[420px] lg:w-[500px] h-auto"
                  priority
                />
                <h1 className="absolute inset-0 flex items-center justify-center font-heading text-[#1E293B] text-3xl md:text-5xl lg:text-6xl leading-tight text-center pb-4 md:pb-6">
                  PREGUNTAS
                  <br />
                  FRECUENTES
                </h1>
              </div>
              {/* Glasses */}
              <Image
                src="/images/glasses.png"
                alt=""
                width={120}
                height={80}
                className="absolute -top-6 right-4 md:-top-10 md:right-8 w-[70px] md:w-[110px] lg:w-[120px] h-auto"
              />
              {/* Hand */}
              <Image
                src="/images/hands_exclamation.png"
                alt=""
                width={80}
                height={100}
                className="absolute -top-2 -right-2 md:-top-2 md:right-4 w-[45px] md:w-[70px] lg:w-[80px] h-auto"
              />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                aria-label="Buscar preguntas frecuentes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 font-body py-8">
                No se encontraron resultados para &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              <Accordion
                variant="light"
                selectionMode="multiple"
                className="px-0"
                itemClasses={{
                  base: "py-0",
                  title:
                    "font-body font-bold text-base md:text-lg text-gray-900 dark:text-white",
                  content: "font-body text-sm md:text-base text-gray-600 dark:text-gray-300 pb-4",
                  trigger: "py-4 border-b border-gray-200 dark:border-gray-700",
                  indicator: "text-gray-400 !rotate-0 transition-transform",
                }}
              >
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    aria-label={faq.question}
                    title={faq.question}
                    indicator={({ isOpen }) => (
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
                      />
                    )}
                  >
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>
      </main>

      <OgFooter />
    </div>
  );
}
