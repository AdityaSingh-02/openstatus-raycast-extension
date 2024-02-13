import { showHUD } from "@raycast/api";

export default async function NoViewCommand() {
  await showHUD("Notify at Bottom!");
}
