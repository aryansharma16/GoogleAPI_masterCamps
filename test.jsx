import React, { useState, useEffect } from "react";

const test = () => {
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";
  const API_KEY = "AIzaSyDUUSAwXWs16ezr9OUfV0BJ_mQK49D9y8E";
  const CLIENT_ID =
    "715247830386-onprhn7rg284nv7v70uee2mdsm0rdpn6.apps.googleusercontent.com";
  const [tokenClient, setTokenClient] = useState();
  const [client, setClient] = useState()

  useEffect(() => {
    if (window.google) {
      const token = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: null,
      });
      setTokenClient(token);
      console.log(token, "token loaded");
    }
  }, []);


  const addCalendarEvent = (startTime, address, clientName) => {
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2024-02-02T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-02-02T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [
        { email: "lpage@example.com" },
        { email: "sbrin@example.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    loadAsync('https://apis.google.com/js/client.js', 'onload', 'gapi')
    .then((gapi) => {
      gapi.client.load('calendar', 'v3', function() {
        const request = window.gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
        }); 
        
      request.execute(function (event) {
        console.log(event)
      });
    })

  });
   
  };

  const handleSignIn = () => {
    if (tokenClient) {
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }
      };

      if (window.gapi.client?.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        tokenClient.requestAccessToken({ prompt: "" });
      }
    }
  };
  function loadAsync(source, callbackParam, globalName) {
    return new Promise((resolve,reject) => {
        let callbackFunc = Math.random().toString(36);

        window[callbackFunc] = () => {
            resolve(window[globalName]);
            delete window[callbackFunc];
        };

        let sep = source.includes('?') ? '&' : '?';
        const script = document.createElement('script');
        script.src = (`${source}${sep}${encodeURIComponent(callbackParam)}=${encodeURIComponent(callbackFunc)}`);
        document.body.appendChild(script)
    });
}
  return (
    <div>
      Google Callender API
      <button onClick={handleSignIn}> Add Callender</button>
      <button onClick={addCalendarEvent}>Add</button>
    </div>
  );
};

export default test;
