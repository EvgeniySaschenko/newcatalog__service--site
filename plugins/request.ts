export default defineNuxtPlugin((nuxtApp) => {
  let defaultParams = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };

  const $pluginRequest = async (url: string, params?: any): Promise<any> => {
    if (params && params.method !== 'GET') {
      params = Object.assign(defaultParams(), params);
    }
    let response: any = await $fetch(url, params);

    // Reload page - if the cache is out of date
    if (response.statusCode == 205) {
      location.reload();
    }

    return response;
  };

  return {
    provide: {
      // Function for requests to server. It is needed to set general rules for all requests
      pluginRequest: $pluginRequest,
    },
  };
});
