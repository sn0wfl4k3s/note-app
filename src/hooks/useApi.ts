import React, { useEffect } from 'react';
import { SignInRequest } from './../models/signInRequest';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import useStorage from "../hooks/useStorage";


export default function useApi() {
  const host = "https://notes-backend-application.herokuapp.com";
  const accessTokenName = 'accessToken';
  const refreshTokenName = 'refreshToken';
  const storage = useStorage();

  useEffect(() => {
    axios.interceptors.request.use(
      async (config) => {
        const token = await storage.getItemAsync(accessTokenName);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status && error.response.status === 401) {
          const originalRequest = error.config;
          const refreshToken = await storage.getItemAsync(refreshTokenName);
          const accessToken = await storage.getItemAsync(accessTokenName);
          const email = jwt_decode<any>(accessToken)['email'];
          if (refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            const credentials: SignInRequest = { email: email, accessKey: refreshToken, grantType: 'refresh_token' };
            return axios
              .post(`${host}/api/Account/Login`, credentials)
              .then(async (res) => {
                if (res.status === 200) {
                  await storage.setItemAsync(accessTokenName, res.data.accessToken);
                  await storage.setItemAsync(refreshTokenName, res.data.refreshToken);
                  return axios(originalRequest);
                }
              });
          }
        }
        return error.response.data ?
          Promise.reject(error.response.data) :
          Promise.reject(error);
      }
    );
  }, []);

  return { host, axios, accessTokenName, refreshTokenName };
}