export default defineNuxtPlugin((nuxtApp) => {
  let defaultParams = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };

  let $request = async (url: string, params?: any): Promise<any> => {
    if (params && params.method !== 'GET') {
      params = Object.assign(defaultParams(), params);
    }
    let response: any = await $fetch(url, params);

    let statusCode = response?.statusCode;
    switch (statusCode) {
      case 202:
      case 204:
      case 404:
      case 500:
        return {
          isError: true,
          showError: () => {
            throw showError({ statusCode, fatal: true });
          },
        };
      case 205:
        location.reload();
        break;
    }

    return response;
  };

  return {
    provide: {
      // Function for requests to server. It is needed to set general rules for all requests
      request: $request,
    },
  };
});
