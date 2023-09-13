import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { parse } from "uuid";

const userData: any = localStorage.getItem("careUserData");

const baseUrlCylinder="'https://eager-fly-handkerchief.cyclic.app/"

const oldRefreshToken =
  "eyJraWQiOiJKNnFZOG84M1RXSDBwQzNkaTVQdjVMZDRwOTU0akJoUlVQVVNCQWhVdU1ZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2NjFiOTM3OC1lZmVhLTRkZDctODQzMC0wODRlYWMyMmUwNmYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9YYjEwWGprTXUiLCJjbGllbnRfaWQiOiI3OTI2a25scm9yNmY2N2U5c2RhZDB1bnY0cSIsIm9yaWdpbl9qdGkiOiJmMTMxNGEzYS0yNjgyLTRhMzQtYWQ1NC0yZTNjNzdhMDZkMGIiLCJldmVudF9pZCI6IjI1OGZmZDU2LTAxNGUtNDc2NC1hMDJmLTBjYmQwOWNiNmQ4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODEwOTE5NDMsImV4cCI6MTY4MTEyNzk0MywiaWF0IjoxNjgxMDkxOTQzLCJqdGkiOiI0YzJiMGIwNi01YTE5LTRlNzctOWNhNS00ODRhNjExMjg3NTIiLCJ1c2VybmFtZSI6IjY2MWI5Mzc4LWVmZWEtNGRkNy04NDMwLTA4NGVhYzIyZTA2ZiJ9.k2EJLkyKxhGHRJgJJDomWjz9V-x1WC57sUqpZc8fLfxtMaTHcYm_voHeFbfq6m4QjNFAp49HwavfMmre4g_yfE4PlBlf5V3lHWgDra7uR_wpcqlJFOyQ5wkJBSRJgozw_iw0tuLw_u9boBhFH7AxoY7mLmt3tQb3l0DhzkocaZtITdaInC2_GT_RyffJWDcztWqwELqPGz5XrwahHomo5N8uRGhWDECaosPSyYnThGE2o6oe2lS5ToPgt4pu75HpjE-TQjUJltYnNS8qUuGR-URE-rgAGB8N2ceJL5Cc04azqJU95HAkEXysEeb3tD2MCq4czeK9tKpl7b8YTikp5A";


export const TAGS= ["onBoarding", "SettingEAttendance", "attendanceReport","staffData" ,"SettingChangePassword", "instructorDashboard", "CoordinatorDashboard", 'bookingStatus', 'SettingKeyInfo', 'SettingJobRole', 'SettingBankHoliday', 'getProfileMetrics', 'SettingRegisterationConfiguration', 'SettingVisaManagement', 'shifts', 'confirmShifts', "unfilledShifts", "shiftManager", "clientModifyStaff", "manage-courses", 'shiftDetailsData', "trainee-info", "upcoming-webinar", 'notifications', 'carerWidgets', "addClient", "createGroup", "getClient", "getManangeGroupData", "clientProfile", "clientComment", "clientAdminUser", "updateEmailPhone", "manageDepartment", "result", 'bookingStatus', 'SettingKeyInfo', 'SettingJobRole', 'SettingBankHoliday', 'getProfileMetrics', 'shifts', 'confirmShifts', "unfilledShifts", "shiftManager", "clientModifyStaff", "manage-courses", "shiftDetailsData", "trainee-info", 'notifications', 'shift-allocated', 'userManagement', "preference", "SettingRegisterationConfiguration", "SettingVisaManagement", "carerWidgets", 'staffAllocationList', 'staffBooking', "financeweekinvoice", "financeinvoice", "invoiceTimeSheet", "invoicesCarers", "trainings","clientPaymentDetails","staffPaymentDetails","ratingClient", "webinar-history","staffSummary","staffManagerCancelShift","openshift","availabilitySheet","incidentReports","WhistleBlowing"]
const cognitoID = "9539c3dc-29eb-49bb-8e10-2c3180018f10";

// fetchBaseQuery logic is unchanged, moved out of createApi for readability
// testingg
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrlCylinder,
  prepareHeaders: async (headers) => {
    const userData: any = localStorage.getItem("careUserData")
    const token: any = JSON.parse(userData);
    console.log("userData", userData);
    headers.set("Authorization", `Bearer ${token.token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error) {
  //   /* try to get a new token if the main query fails: renewAccessToken replaces
  //   the access token in the SecureStore and returns a response code */
  //   const response = await fetch(`${baaseUrl}auth/refresh-token`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: cognitoID,
  //       refreshToken: oldRefreshToken,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const newAccessTokenResponse = await response.json();

  //   if (newAccessTokenResponse?.statusCode === 200) {
  //     token.token = newAccessTokenResponse?.data?.accessToken;
  //     refreshToken = newAccessTokenResponse?.data?.accessToken;

  //     // then, retry the initial query on the fly
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }
  return result;
};

// const { token }: any = JSON.parse(localStorage.getItem("UserData") || "{}");
export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eager-fly-handkerchief.cyclic.app/",

    prepareHeaders: (headers: Headers) => {
      const userData: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

      if (userData?.token) {
        headers.set("Authorization", `Bearer ${userData?.token}`);
      }
      return headers;
    },
  }),
  // baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),

  tagTypes: TAGS,
});
