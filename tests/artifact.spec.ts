import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { executeQuery } from "../utils/helper";

test("Fetch books, manipulate data, and save as artifact", async () => {
  const books = await executeQuery("SELECT title FROM books");
  if (Array.isArray(books)) {
    const manipulatedData =books.reverse().slice(0, 5);
    console.log(manipulatedData);
    const artifactFilePath = path.join(__dirname, "../artifacts/books.json");
    fs.writeFileSync(artifactFilePath, JSON.stringify(manipulatedData, null, 2));
    console.log(`Artifact file created: ${artifactFilePath}`);
  } else {
    console.error("Query result is not an array");
  } 
});
