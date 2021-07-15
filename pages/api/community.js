import { SiteClient } from "datocms-client";

export default async function communitiesAdd(request, response) {
  if (request.method === "POST") {
    const TOKEN = "d3ee919d782c86b61e25e2600fb5e3";
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "968375",
      ...request.body,
    });

    response.json({
      record: record,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}
