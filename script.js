const generateBtn = document.getElementById("generateBtn");
const userInput = document.getElementById("userInput");
const outputBox = document.getElementById("outputBox");
const outputText = document.getElementById("outputText");

const apiKey = "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";
const summarizeModel = "facebook/bart-large-cnn";
const rewriteModel = "Vamsi/T5_Paraphrase_Paws";
const simplifyModel = "t5-base";

generateBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (text === "") {
    alert("Please enter some text!");
    return;
  }

  const task = document.querySelector('input[name="task"]:checked').value;

  let model;
  if (task === "summarize") model = summarizeModel;
  else if (task === "rewrite") model = rewriteModel;
  else model = simplifyModel;

  outputBox.style.display = "block";
  outputText.textContent = "Generating... please wait ⏳";

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await response.json();
    if (data.error) {
      outputText.textContent = "Error: " + data.error;
    } else {
      outputText.textContent =
        data[0].summary_text || data[0].generated_text || "No output.";
    }
  } catch (error) {
    outputText.textContent = "Error fetching AI response!";
  }
});
