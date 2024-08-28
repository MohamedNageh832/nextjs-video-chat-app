import { FC, ReactNode } from "react";

type RootLayoutProps = { children: ReactNode };

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default RootLayout;
