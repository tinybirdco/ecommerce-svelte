import {
  AreaChart,
  Badge,
  BarChart,
  Bold,
  Button,
  Card,
  Grid,
  NumberInput,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title,
} from "@tremor/react";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import KpiCard from "../components/KpiCard";
import { dollarDataFormatter, plainDataFormatter } from "../lib/utils";

const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
const TINYBIRD_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;
const TINYBIRD_BASE_URL = `${TINYBIRD_HOST}/v0/pipes`;

const fetchTinybirdUrl = async (
  pipeName: string,
  params: Record<string, string | number>
): Promise<any[]> => {
  const url = new URL(`${TINYBIRD_BASE_URL}/${pipeName}.json`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );

  const data = await fetch(url);
  const jsonData = await data.json();
  return jsonData.data;
};

export default function KpiCardGrid() {
  // states that are used as query params in tb calls
  const [token, setToken] = useState(TINYBIRD_TOKEN ?? "");
  const [hoursParam, setHoursParam] = useState(1);
  const [category, setCategory] = useState("all");
  const [product, setProduct] = useState("All");
  const [kpiRanking, setKpiRanking] = useState("views");
  const [refreshInterval, setRefreshInterval] = useState(100000);

  const kpisDataQuery = useSWR(
    ["api_kpis", hoursParam, category, product],
    () =>
      fetchTinybirdUrl("api_kpis", {
        hours_param: hoursParam,
        prod_id: product,
        category,
        token,
      }),
    {
      refreshInterval,
      fallbackData: [
        {
          n_views: 0,
          cart_value: 0,
          revenue: 0,
          conversion: 0,
        },
      ],
      revalidateOnFocus: false,
    }
  );

  const productsDataQuery = useSWR(
    ["api_ui_filters", token, category],
    () =>
      fetchTinybirdUrl("api_ui_filters", {
        filter: "product",
        category,
        token,
      }),
    {
      refreshInterval,
      fallbackData: [
        {
          id: "6cHumpSxTvs",
          value: "Sincerely Media Sweatshirt",
        },
        {
          id: "Fg15LdqpWrs",
          value: "Tobias Tullius Jacket",
        },
        {
          id: "Zu7A1GCSjZE",
          value: "Toa Heftiba Pajamas",
        },
        {
          id: "fSdBxY0NxVI",
          value: "Sama Hosseini Sweatshirt",
        },
        {
          id: "xFmXLq_KJxg",
          value: "Caio Coelho Shirt",
        },
        {
          id: "5d0cgAl5BTk",
          value: "Ema Lalita Shirt",
        },
        {
          id: "YY4YaHKh2jQ",
          value: "Laura Chouette T-Shirt",
        },
        {
          id: "p8Drpg_duLw",
          value: "Milada Vigerova Top",
        },
        {
          id: "sZzx0cUDX98",
          value: "Drop the Label T-shirt",
        },
      ],
      revalidateOnFocus: false,
    }
  );

  const revTredDataQuery = useSWR(
    ["api_rev_trend", hoursParam, token, category, product],
    () =>
      fetchTinybirdUrl("api_rev_trend", {
        hours_param: hoursParam,
        prod_id: product,
        category,
        token,
      }),
    {
      refreshInterval,
      fallbackData: [],
      revalidateOnFocus: false,
    }
  );

  const viewsCartsTrendDataQuery = useSWR(
    ["api_views_carts_trend", hoursParam, token, category, product],
    () =>
      fetchTinybirdUrl("api_views_carts_trend", {
        hours_param: hoursParam,
        prod_id: product,
        category,
        token,
      }),
    {
      refreshInterval,
      fallbackData: [],
      revalidateOnFocus: false,
    }
  );
  console.log(viewsCartsTrendDataQuery);

  const prodsRankingDataQuery = useSWR(
    ["api_prods", hoursParam, token, category, product, kpiRanking],
    () =>
      fetchTinybirdUrl("api_prods", {
        hours_param: hoursParam,
        prod_id: product,
        kpi_ranking: kpiRanking,
        category,
        token,
      }),
    {
      refreshInterval,
      fallbackData: [
        {
          name: "",
          price: "0",
          n_views: "0",
          n_carts: "0",
          n_sales: "0",
        },
      ],
      revalidateOnFocus: false,
    }
  );

  const handleInputTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setProduct("All");
    setCategory(value);
  };

  const handleRefresh = () => {
    kpisDataQuery.mutate();
    prodsRankingDataQuery.mutate();
    revTredDataQuery.mutate();
    viewsCartsTrendDataQuery.mutate();
    productsDataQuery.mutate();
  };

  const kpis = [
    {
      title: "Views 👁",
      prefix: "",
      metric: plainDataFormatter(kpisDataQuery.data[0].n_views),
    },
    {
      title: "Cart Value 🛒",
      prefix: "$",
      metric: plainDataFormatter(kpisDataQuery.data[0].cart_value),
    },
    {
      title: "Revenue 💳",
      prefix: "$",
      metric: plainDataFormatter(kpisDataQuery.data[0].revenue),
    },
    {
      title: "Conversion",
      prefix: "%",
      metric: plainDataFormatter(kpisDataQuery.data[0].conversion),
    },
  ];

  return (
    <>
      <Head>
        <title>eCommerce Analytics</title>
      </Head>
      <main className="h-screen p-6 sm:p-10">
        <Title>eCommerce Analytics</Title>
        <Text className="mt-1">
          Analytics for the{" "}
          <Bold>
            <a
              href="https://ecommerce-svelte-rho.vercel.app/"
              className="underline"
            >
              Tinybird eComm Store
            </a>
          </Bold>
          . Built with{" "}
          <Bold>
            <a href="https://www.tremor.so/" className="underline">
              Tremor
            </a>
          </Bold>{" "}
          and these{" "}
          <Bold>
            <a
              href={`https://api.tinybird.co/endpoints?token=${token}`}
              target="blank"
              className="underline"
            >
              API Endpoints
            </a>
          </Bold>
          .
        </Text>

        <Grid numItemsSm={2} numItemsMd={4} className="gap-6 mt-3">
          <div>
            <Text>Hours</Text>
            <NumberInput
              value={hoursParam}
              onValueChange={setHoursParam}
              className="max-w-xs mt-2"
            />
          </div>

          <div>
            <Text>Token</Text>
            <TextInput
              value={token}
              onChange={handleInputTokenChange}
              className="max-w-xs mt-2"
            />
          </div>

          {/* Category Select */}
          <div>
            <Text>Category</Text>
            <Select
              value={category}
              onValueChange={handleCategoryChange}
              className="max-w-xs mt-2"
              placeholder={"Category"}
              defaultValue={"all"}
            >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </Select>
          </div>

          {/* Product Select */}
          <div>
            <Text>Product</Text>
            <Select
              value={product}
              onValueChange={setProduct}
              className="max-w-xs mt-2"
              placeholder={"Product"}
              defaultValue={"All"}
            >
              {productsDataQuery.data.map((prod) => (
                <SelectItem key={prod.id} value={prod.id}>
                  {prod.value}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Text>Refresh interval (ms)</Text>
            <div className="relative">
              <NumberInput
                value={refreshInterval}
                onValueChange={setRefreshInterval}
                enableStepper={false}
                className="max-w-xs mt-2"
              />
              <Button
                className="absolute bottom-0 xl:left-[234px] lg:left-[134px] md:-right-[109px] md:left-auto lg:right-auto left-[234px]"
                size="sm"
                type="button"
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </div>
          </div>
        </Grid>

        <TabGroup className="mt-2">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Detail</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid
                numItemsSm={2}
                numItemsMd={4}
                numItemsLg={4}
                className="mt-3 gap-x-6 gap-y-6"
              >
                {kpis.map((kpi) => (
                  <KpiCard key={kpi.title} {...kpi} />
                ))}
              </Grid>

              <Grid
                numItemsMd={1}
                numItemsLg={2}
                className="mt-3 gap-x-6 gap-y-6"
              >
                <div className="mt-6">
                  <Card>
                    <Title>Actual Revenue vs. Cart Value Trend</Title>
                    <BarChart
                      data={revTredDataQuery.data}
                      index="ts"
                      categories={["cart_value", "revenue"]}
                      colors={["blue", "emerald"]}
                      valueFormatter={dollarDataFormatter}
                      className="mt-6"
                    />
                  </Card>
                </div>
                <div className="mt-6">
                  <Card>
                    <Title>Views & Carts Trend</Title>
                    <AreaChart
                      data={viewsCartsTrendDataQuery.data}
                      index="ts"
                      categories={["n_views", "n_carts"]}
                      colors={["yellow", "blue"]}
                      valueFormatter={plainDataFormatter}
                      className="mt-6"
                    />
                  </Card>
                </div>
              </Grid>
            </TabPanel>

            <TabPanel className="py-3">
              <div>
                <Text>Sort by</Text>
                <Select
                  onValueChange={setKpiRanking}
                  placeholder={"Ranking"}
                  defaultValue={"views"}
                  className="max-w-xs mt-1"
                >
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="carts">Carts</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </Select>
              </div>

              <Grid
                numItemsMd={1}
                numItemsLg={2}
                className="mt-3 gap-x-6 gap-y-6"
              >
                <Card>
                  <Title>Product Ranking</Title>
                  {prodsRankingDataQuery.data &&
                  prodsRankingDataQuery.data.length > 0 ? (
                    <BarChart
                      data={prodsRankingDataQuery.data}
                      index="name"
                      categories={["n_sales", "n_carts", "n_views"]}
                      colors={["emerald", "blue", "yellow"]}
                      valueFormatter={plainDataFormatter}
                      className="h-96"
                      startEndOnly
                      layout="vertical"
                    />
                  ) : (
                    <Text>
                      No products viewed, added to cart, or sold in this range.
                      Increment <Bold>Hours</Bold> value.
                    </Text>
                  )}
                </Card>

                <Card>
                  <Title>Product Details</Title>
                  <Table className="mt-5">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Sales</TableHeaderCell>
                        <TableHeaderCell>Carts</TableHeaderCell>
                        <TableHeaderCell>Views</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prodsRankingDataQuery.data &&
                      prodsRankingDataQuery.data.length ? (
                        prodsRankingDataQuery.data.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <Text>{item.price}</Text>
                            </TableCell>
                            <TableCell>
                              <Badge color="emerald">{item.n_sales}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color="blue">{item.n_carts}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color="yellow">{item.n_views} </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No products
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
    </>
  );
}
