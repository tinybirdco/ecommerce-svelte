import { Card, Flex, Metric, Text } from "@tremor/react";

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
    <Card className="max-w-sm">
      <Flex className="items-start">
        <div>
          <Text>{title}</Text>
          <Metric className="truncate">
            {prefix} {metric}
          </Metric>
        </div>
      </Flex>
    </Card>
  );
}
