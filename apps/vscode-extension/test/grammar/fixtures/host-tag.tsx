const a = cs`<$Card title={$title}>
  <$ui.Badge n={1} />
  <View>{count < $limit ? <$Text>x</$Text> : null}</View>
</$Card>`;
