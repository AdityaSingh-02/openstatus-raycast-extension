import { ActionPanel, Form, Action, Detail, List, Icon, popToRoot, showToast, showHUD } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { LocalStorage } from "@raycast/api";

export default function LoginCommand() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token.length > 19) {
      const options = { method: "GET", headers: { "x-openstatus-key": token } };
      fetch("https://api.openstatus.dev/v1/monitor/", options)
        .then((response) => response.json())
        .then((response) => {
          LocalStorage.setItem("x-openstatus-key", token).then(() => {});
          showHUD("Token Added").then(()=>{})
          popToRoot();
        })
        .catch((err) => {
          popToRoot();
        });
    }
  }, [token]);

  const icon = "openstatus.";

  return (
    <>
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm
              title="submit"
              onSubmit={(values) => {
                if (values.Token.length > 19) {
                  console.log(values);
                  setToken(values.Token);
                } else {
                  console.log("Invalid Token");
                  showToast({ title: "Invalid Token" });
                }
              }}
            />
          </ActionPanel>
        }
      >
        <Form.TextField id="Token" title="Enter API Token" />
      </Form>
    </>
  );
}
