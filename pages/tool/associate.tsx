import type { NextPage } from "next";
import type { Props } from "nextjs/getServerSideProps";
import Associate from "ui/pages/Tool/Associate/Associate";
import LayoutTool from "ui/shared/layout/LayoutTool";

const Page: NextPage<Props> = () => {
  return <Associate />;
};

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>;
};

export default Page;
