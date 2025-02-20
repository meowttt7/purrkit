import type { NextPage } from "next";
import type { Props } from "nextjs/getServerSideProps";
import Multisender from "ui/pages/Tool/Multisender/Multisender";
import LayoutTool from "ui/shared/layout/LayoutTool";

const Page: NextPage<Props> = () => {
  return <Multisender />;
};

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>;
};

export default Page;
