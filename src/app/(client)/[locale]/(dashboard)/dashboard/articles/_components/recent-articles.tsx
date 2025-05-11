import Link from "next/link";
import { formatcreatedAt } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { any } from "zod";

// async function getRecentArticles() {
//   try {
//     const res = await fetch(`${process.env.API_URL}/api/articles?limit=5`, {
//       next: { revalicreatedAt: 60 }, // RevalicreatedAt every minute
//     })

//     if (!res.ok) {
//       throw new Error("Failed to fetch recent articles")
//     }

//     const data = await res.json()
//     return data.articles
//   } catch (error) {
//     console.error("Error fetching recent articles:", error)
//     return []
//   }
// }

export async function RecentArticles() {
  // const articles = await getRecentArticles()

  const articles: any[] = [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>createdAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.length > 0 ? (
          articles.map((article: any) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/dashboard/articles/${article.slug}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  Published
                </Badge>
              </TableCell>
              <TableCell>{formatcreatedAt(article.createdAt, "en-US")}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No recent articles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
