import { LaunchProps } from "@raycast/api";

export default function ArgumentCommand(props: LaunchProps<{ arguments: Arguments.Arguments }>) {
  console.log(props.arguments);
}
