/**
 * Datos de contacto y perfil público del sitio.
 *
 * TODO(contacto): los valores marcados como MOCK son provisorios. Reemplazar por
 * los datos reales antes de publicar — están centralizados acá para que sea un
 * solo cambio.
 */
export const site = {
  name: "Més Capital",
  tagline: "Impulsamos proyectos, potenciamos empresas.",
  url: "https://mescapital.com.ar", // MOCK
  email: "mes.leasingcapital@gmail.com",
  phoneDisplay: "+54 9 11 0000-0000", // MOCK
  phoneHref: "+5491100000000", // MOCK
  whatsappHref: "https://wa.me/5491100000000", // MOCK
  linkedin: "https://www.linkedin.com/company/mes-capital", // MOCK
  instagram: "https://www.instagram.com/mescapital", // MOCK
} as const;

export const nav = [
  { href: "#productos", label: "Productos" },
  { href: "#sectores", label: "Sectores" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#nosotros", label: "Nosotros" },
] as const;

export const provincias = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
] as const;
