import React from "react";
import { Link } from "react-router-dom";

import "./Blog.css";

const Blog = () => {
  return (
    <div className="mt-5">
      <h4 className="font-bold">Welcome to the knowledge-sharing session</h4>
      <section className="queAnsSec">
        <h3 className="font-bold">
          1. What are the different ways to manage a state in a React
          application?
        </h3>
        <p className="text-left">
          <b>Answer: </b>In React apps, there are at least seven ways to handle
          the state. Let us briefly explore a few of them in this part.<br></br>
          <b> URL:</b> URL We can use URL to store some data e.g. The id of the
          current item, being viewed Filter parameters Pagination offset and
          limit Sorting data Keeping such data in the URL allows users to share
          deep links with others. It is recommended to avoid storing such
          information in the app’s state to avoid the URL in our app getting out
          of sync. The URL should be used as the system of record, Read from it
          as needed for information related to sorting, pagination, etc. Update
          the URL as required when the settings change.
        </p>
        <div>
          <p className="my-5 text-bold">Here is some other way</p>
          <ul className="text-left">
            <li>Web Storage</li>
            <li>Local State</li>
            <li>Lifted State</li>
            <li>Derived State</li>
          </ul>
        </div>
      </section>
      <section className="queAnsSec">
        <h3 className="font-bold">2.How does prototypical inheritance work?</h3>
        <p>
          <b>Answer: </b> The Prototypal Inheritance is a feature in javascript
          used to add methods and properties in objects. It is a method by which
          an object can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object. getPrototypeOf and Object.
        </p>
      </section>
      <section className="queAnsSec">
        <h3 className="font-bold">
          3. What is a unit test? Why should we write unit tests?
        </h3>
        <p>
          <b>Answer: </b>A unit test is a way of testing a unit - the smallest
          piece of code that can be logically isolated in a system. In most
          programming languages, that is a function, a subroutine, a method or
          property. The isolated part of the definition is important. <br></br>
          <br></br>
          The main objective of unit testing is to isolate written code to test
          and determine if it works as intended. Unit testing is an important
          step in the development process, because if done correctly, it can
          help detect early flaws in code which may be more difficult to find in
          later testing stages.
        </p>
      </section>
      <section className="queAnsSec">
        <h3 className="font-bold">4. React vs. Angular vs. Vue?</h3>
        <p>
          <b>Answer: </b>React is a UI library, Angular is a fully-fledged
          front-end framework, while Vue. js is a progressive framework. They
          can be used almost interchangeably to build front-end applications,
          but they're not 100 percent the same, so it makes sense to compare
          them and understand their differences.
        </p>
        <h4 className="text-2xl text-bold my-3">React</h4>
        <p>
          React is one of the most popular JavaScript projects with 160k stars
          on GitHub. It’s developed and maintained by Facebook, and it’s used
          internally in many of their projects. Additionally, it powers over 2
          million websites, according to BuiltWith‘s usage statistics.
        </p>
        <h4 className="text-2xl text-bold my-3">Vue</h4>
        <p>
          Out of the three frameworks, Vue has the most stars on GitHub, with
          176k stars. The project is developed and led by ex-Googler Evan You.
          It’s a very strong, independent project in the open-source community
          and is used by over 1 million websites, according to BuiltWith.
        </p>
        <h4 className="text-2xl text-bold my-3">Angular</h4>
        <p>
          Angular is developed by Google, but surprisingly it’s not used in some
          of their flagship products such as Search or Youtube. It’s often used
          in enterprise projects, and it powers over 97,000 websites based on
          BuiltWith‘s data. <br></br>It’s the least starred among the three
          frameworks, with 68k stars on GitHub. However, when switching from
          Angular 1 to Angular 2, they created an entirely new repository
          instead of continuing the AngularJS project, which also has 59k stars.
        </p>
      </section>
    </div>
  );
};

export default Blog;
