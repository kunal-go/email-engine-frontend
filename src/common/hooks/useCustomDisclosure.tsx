import { useDisclosure } from "@mantine/hooks";

export function useCustomDisclosure(initialState = false) {
  const [opened, { open, close }] = useDisclosure(initialState);
  return { opened, open, onClose: close };
}
