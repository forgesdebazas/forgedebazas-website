import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,

  // Production source maps (set to false to disable, 'hidden-source-map' for production debugging)
  productionBrowserSourceMaps: false,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
    ],
  },

  // Optimize images
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp","image/avif"],
    deviceSizes: [
      640,
      750,
      828,
      1080,
      1200,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
    qualities: [75],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.servcoforklift.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      // },
      {
        protocol: "https",
        hostname: "sanyglobal-img.sany.com.cn",
      },
      {
        protocol: "https",
        hostname: "www.toyotamaterialhandling.com.au",
      },
      {
        protocol: "https",
        hostname: "www.sanyglobal.com",
      },
      {
        protocol: "https",
        hostname: "www.lismanforklifts.com",
      },
      {
        protocol: "https",
        hostname: "www.sunwardmachine.com",
      },
      {
        protocol: "https",
        hostname: "www.sunwardmining.com",
      },
      {
        protocol: "https",
        hostname: "sunward-equipment.com",
      },
      {
        protocol: "https",
        hostname: "fabo.com.tr",
      },
      {
        protocol: "https",
        hostname: "fabo-59e2.kxcdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "ajax-conveyor.com",
      },
      {
        protocol: "https",
        hostname: "www.teksan.com.tr",
      },
      // {
      //   protocol: "https",
      //   hostname: "diect.com",
      // },
      {
        protocol: "https",
        hostname: "**.sinoboom.com",
      },
      {
        protocol: "https",
        hostname: "**.combilift.com",
      },
      {
        protocol: "https",
        hostname: "toyotaforklift.scene7.com",
      },
      {
        protocol: "https",
        hostname: "cdn.rents.ma",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "img.icons8.com",
      // },
      // {
      //   protocol:"https",
      //   hostname:"images.pexels.com"
      // },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "www.eneria.fr",
      },
      {
        protocol: "https",
        hostname: "d1yjjnpx0p53s8.cloudfront.net",
      },
      // {
      //   protocol: "https",
      //   hostname: "static.wixstatic.com",
      // },
      {
        protocol: "https",
        hostname: "combilift.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "img.freepik.com",
      // },
      {
        protocol: "https",
        hostname: "www.genieindustries.com",
      },
      {
        protocol: "https",
        hostname: "www.jcb.com",
      },
      {
        protocol: "https",
        hostname: "www.kobelco-usa.com",
      },
      {
        protocol: "https",
        hostname: "www.mhps.com",
      },
      {
        protocol: "https",
        hostname: "cdn.teksan.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "www.rayonnage-maroc.com",
      },
      {
        protocol: "https",
        hostname: "img.equipmentworld.com",
      },
      {
        protocol: "https",
        hostname: "sanyperkasa.com",
      },
      {
        protocol: "https",
        hostname: "img.directindustry.fr",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "fr.liftow.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "i.imgur.com",
      // },
      {
        protocol: "https",
        hostname: "cdn.toyota-forklifts.eu",
      },
      {
        protocol: "https",
        hostname: "www.marchandise.be",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "toyota-forklifts.fr",
      },
      {
        protocol: "https",
        hostname: "masaequiposindustriales.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "encrypted-tbn0.gstatic.com",
      // },
      {
        protocol: "https",
        hostname: "www.toyotawarehousesolutions.co.th",
      },
      {
        protocol: "https",
        hostname: "www.tvh.com",
      },
      {
        protocol: "https",
        hostname: "tmhe-media.azureedge.net",
      },
      {
        protocol: "https",
        hostname: "toyotamaterialhandling-international.com",
      },
      {
        protocol: "https",
        hostname: "atoxgrupo.com",
      },
      {
        protocol: "https",
        hostname: "www.lectura-specs.com"
      },
      {
        protocol: "https",
        hostname: "www.hermans-heftrucks.be"
      },
      // {
      //   protocol: "https",
      //   "hostname": "www.leveelibre.fr"
      // },
      // {
      //   protocol: "https",
      //   "hostname": "cfaoequipment-guineebissau.com"
      // }
      {
        protocol: "https",
        hostname: "cdn-ilecokb.nitrocdn.com",
      },
      {
        protocol: "https",
        hostname: "aisle-master.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
