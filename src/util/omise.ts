import type { CardCardInput, ReturnJSON, Payment, Charge } from "../types";
import base64 from "base-64";

const vaultUrl: string = "https://vault.omise.co/";
const apiUrl: string = "https://api.omise.co/";

type Headers = {
  Authorization: string;
  "Content-Type": string;
  "Omise-Version": string;
};

type FetchParams = {
  method: string;
  cache: string;
  headers: Headers;
  body: any;
};

class Omise {
  #pkey: string;
  #skey: string;
  #apiVersion: string;

  constructor(pkey: string, skey: string, apiVersion: string = "2019-05-29") {
    this.#pkey = pkey;
    this.#skey = skey;
    this.#apiVersion = apiVersion;
  }

  createToken = (data: CardCardInput): Promise<ReturnJSON> => {
    return this._request<CardCardInput, ReturnJSON>(
      vaultUrl,
      "tokens",
      this.#pkey,
      data
    );
  };

  charge = (data: Payment): Promise<Charge> => {
    return this._request<Payment, Charge>(apiUrl, "charges", this.#skey, data);
  };

  _getHeaders = (key: string): Headers => {
    const headers: Headers = {
      Authorization: "Basic " + base64.encode(key + ":"),
      "Content-Type": "application/json",
      "Omise-Version": this.#apiVersion,
    };

    return headers;
  };

  _request = async <Data, Return>(
    url: string,
    endpoint: string,
    key: string,
    data: Data
  ): Promise<Return> => {
    const urlEndpoint: string = url + endpoint;
    const body: string = JSON.stringify(data);

    const params: FetchParams = {
      method: "POST",
      cache: "no-cache",
      headers: this._getHeaders(key),
      body,
    };

    return new Promise((resolve, reject) => {
      return fetch(urlEndpoint, params)
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(response.json());
          } else {
            reject(JSON.stringify(response, null, 2));
          }
        })
        .catch((error) => reject(JSON.stringify(error, null, 2)));
    });
  };
}

export const omise: Omise = new Omise(
  "pkey_test_5wvisbxphp1zapg8ie6",
  "skey_test_5wvisdjjoqmfof5npzw"
);
