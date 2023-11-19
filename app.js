document.getElementById("searchButton").addEventListener("click", handleSearch);

async function handleSearch(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const inputPromises = [];

  // Show loading text
  document.getElementById("loadingText").style.display = "block";

  for (let i = 1; i <= 10; i++) {
    const inputField = document.getElementById(`q${i}`);
    const inputText = inputField.value.trim();

    if (inputText !== "") {
      const config = {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: inputText }),
      };

      inputPromises.push(
        fetch(
          "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
          config
        )
          .then((response) => response.blob())
          .catch((error) => {
            console.error(`Error fetching data for input ${i}:`, error);
            return null;
          })
      );
    }
  }

  try {
    const results = await Promise.all(inputPromises);

    // Hide loading text
    document.getElementById("loadingText").style.display = "none";

    // Render results
    createResults(results);
  } catch (error) {
    console.error("Error in Promise.all:", error);
    // Handle error, e.g., display an error message
  }
}

const createResults = (data) => {
  const container = document.getElementById("results");
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const result = data[i];

    if (result && result.size > 0) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(result);
      img.alt = `Generated Image ${i + 1}`;
      const element = document.createElement("div");
      element.classList.add("ele");
      element.append(img);
      container.append(element);
    } else {
      container.innerHTML += `<p>No results found for search ${i + 1}</p>`;
    }
  }
};
