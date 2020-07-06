import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "Css", "Phython"];

  return (
    <ul className='flex-center'>
      {" "}
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={
              language === selected
                ? {
                    color: "rgb(187,46,31)",
                  }
                : null
            }
            onClick={() => onUpdateLanguage(language)}>
            {" "}
            {language}{" "}
          </button>{" "}
        </li>
      ))}{" "}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul classNamec='grid space-around'>
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url} className='repo bg-light'>
            <h4 className='header-lg center-text'>#{index + 1}</h4>
            <img
              src={avatar_url}
              alt={`Avatar for ${login}`}
              className='avatar'
            />
            <h2 className='center-text'>
              <a className='link' href={html_url}>
                {login}
              </a>
            </h2>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};
export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              repos,
              [selectedLanguage]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos:", error);

          this.setState({
            error: `There was an error fetching the repositories`,
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, error, repos } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
