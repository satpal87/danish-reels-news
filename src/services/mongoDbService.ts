
export interface NewsArticle {
  title: string;
  url: string;
  image: string;
  summary: string;
  scraped_at: Date;
}

// Mock data based on the MongoDB collection structure
const mockArticles: NewsArticle[] = [
  {
    title: "Ditte blev kaldt alverdens skældsord af butikskunder - og blev syg af det",
    url: "https://www.dr.dk/nyheder/indland/ditte-blev-kaldt-alverdens-skaeldsord-af-butikskunder-og-blev-syg-af-det",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/10/ditte_delorang_roi.jpg",
    summary: "Ditte Delorang Roi brændte for servicefaget, men kan i dag ikke forestille sig at vende tilbage til butiksbranchen, efter hun ifølge hende selv blev talt grimt til af kunder.",
    scraped_at: new Date("2025-05-11T13:49:21.558Z")
  },
  {
    title: "Klimaminister: Danmarks beslutning om at udfase benzin- og dieselbiler fra 2030 stod fast",
    url: "https://www.dr.dk/nyheder/politik/klimaminister-danmarks-beslutning-om-udfase-benzin-og-dieselbiler-fra-2030-stod-fast",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/11/lars_aagaard_klimaminister.jpg",
    summary: "Lars Aagaard understeger, at Danmark fortsat vil udfase benzin- og dieselbiler fra 2030, selv efter EU's beslutning om at forlænge fristen til 2035.",
    scraped_at: new Date("2025-05-11T15:20:12.100Z")
  },
  {
    title: "Eksperter: Risikoen for kinesisk invasion af Taiwan er højere end nogensinde",
    url: "https://www.dr.dk/nyheder/udland/eksperter-risikoen-kinesisk-invasion-af-taiwan-er-hoejere-end-nogensinde",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/11/taiwan_china_military.jpg",
    summary: "Efter Taiwans nyvalgte præsident William Lai aflagde sin ed i sidste uge, har Kina optrappet sine militærøvelser omkring øen til et hidtil uset niveau.",
    scraped_at: new Date("2025-05-11T14:15:30.220Z")
  },
  {
    title: "Vinder for anden uge i træk: FC København slår Brøndby og beholder førstepladsen",
    url: "https://www.dr.dk/nyheder/sport/fodbold/vinder-anden-uge-i-traek-fc-koebenhavn-slaar-broendby-og-beholder",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/11/fck_broendby_derby.jpg",
    summary: "FC København vandt søndagens derby mod Brøndby med 2-1 og cementerer dermed deres førsteplads i Superligaen med fire point ned til nærmeste forfølger.",
    scraped_at: new Date("2025-05-11T18:30:45.600Z")
  },
  {
    title: "Antallet af overvægtige børn i Danmark er steget med 30 procent siden 2019",
    url: "https://www.dr.dk/nyheder/indland/antallet-af-overvaegtige-boern-i-danmark-er-steget-med-30-procent-siden-2019",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/10/overvaegt_boern_danmark.jpg",
    summary: "Ny rapport fra Sundhedsstyrelsen viser bekymrende stigning i antallet af overvægtige børn. Eksperter peger på COVID-19 lockdowns og øget skærmtid som mulige årsager.",
    scraped_at: new Date("2025-05-10T09:45:22.331Z")
  },
  {
    title: "Stigende boligrenter giver historisk høj interesse for andelsboliger",
    url: "https://www.dr.dk/nyheder/penge/stigende-boligrenter-giver-historisk-hoej-interesse-andelsboliger",
    image: "https://asset.dr.dk/drdk/drupal-images/other/2025/05/09/andelsboliger_koebenhavn.jpg",
    summary: "Mens ejerboligmarkedet er under pres fra stigende renter, oplever andelsboligforeninger rekordhøj efterspørgsel. Ventelisterne er flere steder over et år lange.",
    scraped_at: new Date("2025-05-09T16:10:35.900Z")
  }
];

export async function getNewsArticles(): Promise<NewsArticle[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock articles
  return [...mockArticles];
}
