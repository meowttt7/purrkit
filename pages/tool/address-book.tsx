import type { NextPage } from "next";
import type { Props } from "nextjs/getServerSideProps";
import AddressBook from "ui/pages/Tool/AddressBook/AddressBook";
import LayoutTool from "ui/shared/layout/LayoutTool";

const Page: NextPage<Props> = () => {
  return <AddressBook />;
};

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>;
};

export default Page;
