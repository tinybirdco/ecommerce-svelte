import { Block, Card, Flex, Metric, Text } from "@tremor/react";

type KpiCardProps = {
  title: string;
  metric: string;
  prefix: string;
};

// Single KPI card in the demo dashboard with sample inputs
export default function KpiCard({
  title = "defaultTitle",
  metric = "defaultMetric",
  prefix = "",
}: KpiCardProps) {
  return (
    <Card maxWidth="max-w-sm">
      <Flex alignItems="items-start">
        <Block>
          <Text>{title}</Text>
          <Metric truncate={true}>
            {prefix} {metric}
          </Metric>
        </Block>
      </Flex>
    </Card>
  );
}
