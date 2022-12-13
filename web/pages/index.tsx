import QuestionInput from '/pages/QuestionInput'

export default function Home() {
  return (
    <>
      <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example">
        <h4 id="list-item-1">Question 1</h4>
        <QuestionInput></QuestionInput>
        <h4 id="list-item-2">Question 2</h4>
        <QuestionInput></QuestionInput>
        <h4 id="list-item-3">Question 3</h4>
        <QuestionInput></QuestionInput>
      </div>
    </>
  );
}
