import { useState, useEffect, SetStateAction } from 'react';
import {
  AreaChart,
  BarChart,
  Badge,
  Block,
  Bold,
  Card,
  ColGrid,
  Dropdown,
  DropdownItem,
  Flex,
  Tab,
  TabList,
  Text,
  Title,
  Table,
  TableHead,
  TableBody,
  TableHeaderCell,
  TableRow,
  TableCell,
  TextInput
} from '@tremor/react';
import KpiCard from '../components/KpiCard';
import DropDownTbFilter from '../components/DropDownTbFilter';

const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST
const TINYBIRD_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN

export default function KpiCardGrid() {

  const [selectedView, setSelectedView] = useState(1);

  // states that are used as query params in tb calls
  const [token, setToken] = useState(TINYBIRD_TOKEN);
  const [hoursParam, setHoursParam] = useState('1');
  const [category, setCategory] = useState('all');
  const [product, setProduct] = useState('All');
  const [kpiRanking, setKpiRanking] = useState('views');

  //results shown in the dashboard
  const [products, setProducts] = useState([
    {
      "id": "6cHumpSxTvs",
      "value": "Sincerely Media Sweatshirt",
    },
    {
      "id": "Fg15LdqpWrs",
      "value": "Tobias Tullius Jacket",
    },
    {
      "id": "Zu7A1GCSjZE",
      "value": "Toa Heftiba Pajamas",
    },
    {
      "id": "fSdBxY0NxVI",
      "value": "Sama Hosseini Sweatshirt",
    },
    {
      "id": "xFmXLq_KJxg",
      "value": "Caio Coelho Shirt",
    },
    {
      "id": "5d0cgAl5BTk",
      "value": "Ema Lalita Shirt",
    },
    {
      "id": "YY4YaHKh2jQ",
      "value": "Laura Chouette T-Shirt",
    },
    {
      "id": "p8Drpg_duLw",
      "value": "Milada Vigerova Top",
    },
    {
      "id": "sZzx0cUDX98",
      "value": "Drop the Label T-shirt",
    }
  ])
  const [kpiData, setKpiData] = useState([{
    "n_views": 0,
    "cart_value": 0,
    "revenue": 0,
    "conversion": 0
  }]);
  const [revTrend, setRevTrend] = useState([])
  const [viewsCartsTrend, setViewsCartsTrend] = useState([])
  const [prodsRanking, setProdsRanking] = useState([{
    "name": '',
    "price": '0',
    "n_views": '0',
    "n_carts": '0',
    "n_sales": '0',
  }])


  const handleInputTokenChange = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
    setToken(event.target.value)
  }

  const handleInputhoursParamChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setHoursParam(event.target.value)
  }

  const handleCategoryChange = (value: SetStateAction<string>) => {
    setProduct('All');
    // above works but I cannot set Dropdown selection to be reactive and change if value changes
    setCategory(value)
  }

  const dollarDataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  const plainDataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  //tb urls
  let filterUrl = `https://${TINYBIRD_HOST}/v0/pipes/api_ui_filters.json?filter=product&token=${token}&category=${category}`
  let apiKpis = `https://${TINYBIRD_HOST}/v0/pipes/api_kpis.json?hours_param=${hoursParam}&token=${token}&category=${category}&prod_id=${product}`
  let apiRevTrend = `https://${TINYBIRD_HOST}/v0/pipes/api_rev_trend.json?hours_param=${hoursParam}&token=${token}&category=${category}&prod_id=${product}`
  let apiViewsCartsTrend = `https://${TINYBIRD_HOST}/v0/pipes/api_views_carts_trend.json?hours_param=${hoursParam}&token=${token}&category=${category}&prod_id=${product}`
  let apiProdsRanking = `https://${TINYBIRD_HOST}/v0/pipes/api_prods.json?hours_param=${hoursParam}&token=${token}&category=${category}&prod_id=${product}&kpi_ranking=${kpiRanking}`

  // auxiliary function to retrieve the data from tinybird and update the state
  const fetchTinybirdUrl = async (fetchUrl: string, setState: Function) => {
    console.log(fetchUrl);
    const data = await fetch(fetchUrl)
    const jsonData = await data.json();
    setState(jsonData.data);
  }

  //useEffects to call tb and update shown data on each change of the url
  useEffect(() => {
    fetchTinybirdUrl(apiKpis, setKpiData)
  }, [apiKpis]);

  useEffect(() => {
    fetchTinybirdUrl(filterUrl, setProducts)
  }, [filterUrl]);

  useEffect(() => {
    fetchTinybirdUrl(apiRevTrend, setRevTrend)
  }, [apiRevTrend]);

  useEffect(() => {
    fetchTinybirdUrl(apiViewsCartsTrend, setViewsCartsTrend)
  }, [apiViewsCartsTrend]);

  useEffect(() => {
    fetchTinybirdUrl(apiProdsRanking, setProdsRanking)
  }, [apiProdsRanking]);


  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>eCommerce Analytics</Title>
      <Text marginTop='mt-1'>
        Analytics for the <Bold><a href='https://ecommerce-svelte-rho.vercel.app/'>Tinybird eComm Store</a></Bold>.
        Built with <Bold><a href='https://www.tremor.so/'>Tremor</a></Bold> and these <Bold><a href={`https://api.tinybird.co/endpoints?token=${token}`} target='blank'>API Endpoints</a></Bold>.
      </Text>

      <ColGrid numColsSm={2} numColsMd={4}  gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-3">
        <Block>
          <Text>Hours</Text>
          <TextInput
            value={hoursParam}
            onChange={handleInputhoursParamChange}
            error={isNaN(parseInt(hoursParam))}
            errorMessage="Please input an integer"
            maxWidth="max-w-xs"
            marginTop="mt-2"
          />
        </Block>

        <Block>
          <Text>Token</Text>
          <TextInput
            value={token}
            onChange={handleInputTokenChange}
            maxWidth="max-w-xs"
            marginTop="mt-2"
          />
        </Block>

        {/* Category Dropdown */}
        <Block>
          <Text>Category</Text>
          <Dropdown
            handleSelect={(value) => handleCategoryChange(value)}
            marginTop="mt-2"
            placeholder={"Category"}
            defaultValue={"all"}
            maxWidth='max-w-xs'
          >
            <DropdownItem
              value='all'
              text="All"
            />
            <DropdownItem
              value='short sleeve'
              text="Short sleeve"
            />
            <DropdownItem
              value='long sleeve'
              text="Long sleeve"
            />
          </Dropdown>
        </Block>
        {/* Product Dropdown. Issue: when a short sleeve product is selected and user changes category dropdown 
        to long sleeve, state gets updated thanks to handleCategoryChange() but dropdown's selected value is blank.
        I guess cause the whole dropdown is not re-rendered */}
        <Block>
          <Text>Product</Text>
          <Dropdown handleSelect={(value) => setProduct(value)}
            marginTop="mt-2"
            placeholder={"Product"}
            defaultValue={"All"}
            maxWidth='max-w-xs'>
            {products.map(prod =>
              <DropdownItem key={prod.id} value={prod.id} text={prod.value} />
            )}
          </Dropdown>
        </Block>
        {/* Tried this approach but is not working */}
        {/* <DropDownTbFilter filter={Array.from(products)} setState={setProduct}/> */}
      </ColGrid>


      <TabList defaultValue={1} handleSelect={(value) => setSelectedView(value)} marginTop="mt-2">
        <Tab value={1} text="Overview" />
        <Tab value={2} text="Detail" />
      </TabList>


      {selectedView === 1 ? (
        <>

          <ColGrid numColsSm={2} numColsMd={4} numColsLg={4} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-3">
            {/* KPIs: api_kpi endpoint */}
            <KpiCard title='Views 👁' prefix='' metric={kpiData ? Intl.NumberFormat("us").format(kpiData[0].n_views).toString() : '0'}></KpiCard>
            <KpiCard title='Cart Value 🛒' prefix='$' metric={kpiData ? Intl.NumberFormat("us").format(kpiData[0].cart_value) : '0'}></KpiCard>
            <KpiCard title='Revenue 💳' prefix='$' metric={kpiData ? Intl.NumberFormat("us").format(kpiData[0].revenue) : '0'}></KpiCard>
            <KpiCard title='Conversion' prefix='%' metric={kpiData ? Intl.NumberFormat("us").format(kpiData[0].conversion) : '0'}></KpiCard>
          </ColGrid>

          <ColGrid numColsMd={1} numColsLg={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-3">
            <Block marginTop="mt-6">
              <Card>
                <Title>Actual Revenue vs. Cart Value Trend</Title>
                <BarChart
                  data={revTrend}
                  dataKey="ts"
                  categories={["cart_value", "revenue"]}
                  colors={["blue", "emerald"]}
                  valueFormatter={dollarDataFormatter}
                  marginTop="mt-6"
                  yAxisWidth="w-20"
                />
              </Card>
            </Block>
            <Block marginTop="mt-6">
              <Card>
                <Title>Views & Carts Trend</Title>
                <AreaChart
                  data={viewsCartsTrend}
                  dataKey="ts"
                  categories={["n_views", "n_carts"]}
                  colors={["yellow", "blue"]}
                  valueFormatter={plainDataFormatter}
                  marginTop="mt-6"
                  yAxisWidth="w-20"
                />
              </Card>
            </Block>
          </ColGrid>
        </>
      ) : (
        <Block>
          <Block marginTop="mt-3">
            <Text>Sort by</Text>
            <Dropdown
              handleSelect={(value) => setKpiRanking(value)}
              placeholder={"Ranking"}
              defaultValue={"views"}
              marginTop="mt-1"
              maxWidth='max-w-xs'
            >
              <DropdownItem
                value='sales'
                text="Sales"
              />
              <DropdownItem
                value='carts'
                text="Carts"
              />
              <DropdownItem
                value='views'
                text="Views"
              />
            </Dropdown>
          </Block>

          <ColGrid numColsMd={1} numColsLg={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-3">
            <Block>
              <Card>
                <Title>Product Ranking</Title>
                {prodsRanking && prodsRanking.length > 0 ? (
                  <BarChart
                    data={prodsRanking}
                    dataKey="name"
                    categories={[
                      "n_sales",
                      "n_carts",
                      "n_views",
                    ]}
                    colors={["emerald", "blue", "yellow"]}
                    valueFormatter={plainDataFormatter}
                    marginTop="mt-0"
                    yAxisWidth="w-14"
                    startEndOnly={true}
                    layout='vertical'
                    height='h-96'
                  />) : <Text>No products viewed, added to cart, or sold in this range. Increment <Bold>Hours</Bold> value.</Text>
                }
              </Card>

            </Block>
            <Block>
              <Card>
                <Title>Product Details</Title>
                <Table marginTop="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>
                        Name
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Price
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Sales
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Carts
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Views
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prodsRanking ? prodsRanking.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Text>{item.price}</Text>
                        </TableCell>
                        <TableCell>
                          <Badge text={item.n_sales} color="emerald" />
                        </TableCell>
                        <TableCell>
                          <Badge text={item.n_carts} color="blue" />
                        </TableCell>
                        <TableCell>
                          <Badge text={item.n_views} color="yellow" />
                        </TableCell>
                      </TableRow>
                    )) : <TableRow key={'0'}>
                      <TableCell>
                        {'no prods'}
                      </TableCell>
                      <TableCell>
                        <Text>{'0'}</Text>
                      </TableCell>
                      <TableCell>
                        <Badge text={'0'} color="emerald" />
                      </TableCell>
                      <TableCell>
                        <Badge text={'0'} color="blue" />
                      </TableCell>
                      <TableCell>
                        <Badge text={'0'} color="yellow" />
                      </TableCell>
                    </TableRow>}
                  </TableBody>
                </Table>
              </Card>
            </Block>
          </ColGrid>
        </Block>
      )}
    </main>
  );
}
