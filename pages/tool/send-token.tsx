import type { NextPage } from "next";
import type { Props } from "nextjs/getServerSideProps";
import SendToken from "ui/pages/Tool/SendToken/SendToken";
import LayoutTool from "ui/shared/layout/LayoutTool";

const Page: NextPage<Props> = () => {
  return <SendToken />;
};

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>;
};

export default Page;
