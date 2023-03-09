// Date formatting
let date = (date: Date | null) => {
  if (!date) return '-';

  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('uk', options).format(new Date(date));
};

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $date: typeof date;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: { date },
  };
});
