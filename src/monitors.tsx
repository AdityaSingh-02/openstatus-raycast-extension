import { Action, ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import fetch from "node-fetch";
import { useEffect, useState } from "react";

export default function MonitorCommand() {
  const [token, setToken] = useState<any>();
  const [data, setData] = useState([]);

  const getToken = async () => {
    const res = await LocalStorage.getItem("x-openstatus-key");
    setToken(res);
    console.log(res);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    const options = { method: "GET", headers: { "x-openstatus-key": token } };
    fetch("https://api.openstatus.dev/v1/monitor/", options)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((err) => {});
  }, [token]);

  return (
    <>
      <List>
        {data.map(({ name, status }) => (
          <List.Item
            key={name}
            title={name}
            actions={
              <ActionPanel>
                <Action title="Select" onAction={() => console.log(`${name} selected`)} />
              </ActionPanel>
            }
            // accessories={[{icon: Icon.CheckCircle}]}
            icon={{
              source: Icon.Circle,
              tintColor: {
                light: "green",
                dark: "green",
                adjustContrast: true,
              },
            }}
          />
        ))}
      </List>
    </>
  );
}
