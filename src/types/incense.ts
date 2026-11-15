type IncenseBase = {
   id: string,
   name: string,
   brand: string,
   series?: string,
   country: string,
   photo?: string,
   aromas: string[],
}

type CoredCharacteristics = {
   baseType: 'core',
   incenseType: 'masala'|'coal'|'other';
   form: 'stick',
}

type CorelessCharacteristics = {
   baseType: 'coreless',
   incenseType: 'tibetan'|'coal'|'other';
   form: 'stick'|'cone'|'briquette'|'other',
}

export type Incense = IncenseBase&(CoredCharacteristics|CorelessCharacteristics)