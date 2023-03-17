let defaultParams = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const $pluginRequest = async (url: string, params?: any): Promise<any> => {
  if (params && params.method !== 'GET') {
    params = Object.assign(defaultParams(), params);
  }

  // let cookies = useRequestHeaders(['cookie']);
  // console.log(cookies);
  // Object.assign(params, cookies);

  let response: any;
  try {
    response = await $fetch(url, params);
  } catch (error) {
    // Unexpected Errors
    console.error(error);
  }

  if (response.statusCode == 205) {
    location.reload();
  }
  // if (response.status == 400) {
  //   // Data validation errors
  //   throw await response.json();
  // } else if (response.status == 404) {
  //   throw { server: 'URL не найден на сервере' };
  // } else if (response.status > 400) {
  //   // Other server errors
  //   console.error(response);
  //   throw { server: 'Ошибка сервера' };
  // }
  return response;
};

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // Function for requests to server. It is needed to set general rules for all requests
      pluginRequest: $pluginRequest,
    },
  };
});
