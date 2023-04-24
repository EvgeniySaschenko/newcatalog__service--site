export class PluginRequest {
  defaultParams() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async request(url: string, params?: any): Promise<any> {
    if (params && params.method !== 'GET') {
      params = Object.assign(this.defaultParams(), params);
    }
    let response: any = await $fetch(url, params);

    let statusCode = response?.statusCode;
    switch (statusCode) {
      case 204:
      case 404:
      case 500:
      case 503:
        /*
          If the server returned "statusCode" instead of data, this function will be returned, 
          it must be called on the page in order to display the fullscreen error
        */
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
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let pluginRequest = new PluginRequest();

  return {
    provide: {
      // Function for requests to server. It is needed to set general rules for all requests
      request: pluginRequest.request,
    },
  };
});
