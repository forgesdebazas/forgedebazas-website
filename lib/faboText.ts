const SPEC_TRANSLATIONS: Record<"en" | "es", Array<[RegExp, string]>> = {
  en: [
    [/CAPACIT[ÉEÃ‰]+ DE PRODUCTION/gi, "PRODUCTION CAPACITY"],
    [/PUISSANCE TOTALE DU MOTEUR/gi, "TOTAL MOTOR POWER"],
    [/PUISSANCE DU MOTEUR/gi, "MOTOR POWER"],
    [/PUISSANCE/gi, "POWER"],
    [/TAILLE DE CR[İI]BLE VIBRANT/gi, "VIBRATING SCREEN SIZE"],
    [/BANDE DE CR[İI]BLE V[İI]BRANTE/gi, "VIBRATING SCREEN BELT"],
    [/ALIMENTATION MAXIMALE/gi, "MAX FEED SIZE"],
    [/TAILLE DU ROTOR/gi, "ROTOR SIZE"],
    [/G[ÉE]N[ÉE]RATEUR \(EN OPTION\)/gi, "GENERATOR (OPTIONAL)"],
    [/TYPE DE CONCASSEUR/gi, "CRUSHER TYPE"],
    [/OUVERTURE DE SORTIE/gi, "OUTPUT OPENING"],
    [/TAILLE D['’]ALIMENTATION/gi, "FEED SIZE"],
    [/TAILLE DE CRIBLE VIBRANT/gi, "VIBRATING SCREEN SIZE"],
    [/POIDS/gi, "WEIGHT"],
    [/DIMENSIONS/gi, "DIMENSIONS"],
    [/Marque/gi, "Brand"],
    [/Disponibilit[ée]/gi, "Availability"],
    [/Sur demande/gi, "On request"],
    [/TONNE/gi, "TON"],
  ],
  es: [
    [/CAPACIT[ÉEÃ‰]+ DE PRODUCTION/gi, "CAPACIDAD DE PRODUCCION"],
    [/PUISSANCE TOTALE DU MOTEUR/gi, "POTENCIA TOTAL DEL MOTOR"],
    [/PUISSANCE DU MOTEUR/gi, "POTENCIA DEL MOTOR"],
    [/PUISSANCE/gi, "POTENCIA"],
    [/TAILLE DE CR[İI]BLE VIBRANT/gi, "TAMANO DE CRIBA VIBRANTE"],
    [/BANDE DE CR[İI]BLE V[İI]BRANTE/gi, "BANDA DE CRIBA VIBRANTE"],
    [/ALIMENTATION MAXIMALE/gi, "ALIMENTACION MAXIMA"],
    [/TAILLE DU ROTOR/gi, "TAMANO DEL ROTOR"],
    [/G[ÉE]N[ÉE]RATEUR \(EN OPTION\)/gi, "GENERADOR (OPCIONAL)"],
    [/TYPE DE CONCASSEUR/gi, "TIPO DE TRITURADORA"],
    [/OUVERTURE DE SORTIE/gi, "APERTURA DE SALIDA"],
    [/TAILLE D['’]ALIMENTATION/gi, "TAMANO DE ALIMENTACION"],
    [/TAILLE DE CRIBLE VIBRANT/gi, "TAMANO DE CRIBA VIBRANTE"],
    [/POIDS/gi, "PESO"],
    [/DIMENSIONS/gi, "DIMENSIONES"],
    [/Marque/gi, "Marca"],
    [/Disponibilit[ée]/gi, "Disponibilidad"],
    [/Sur demande/gi, "Bajo pedido"],
    [/TONNE/gi, "TON"],
  ],
};

export function translateFaboSpecText(text: string, language: string): string {
  if (language !== "en" && language !== "es") return text;
  return SPEC_TRANSLATIONS[language].reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    text,
  );
}
