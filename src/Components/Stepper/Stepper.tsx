import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    contentContainer: {
        marginBottom: '30px',
    },
}));

const getSteps = () => {
    return [
        {
            label: 'Upload JSON',
            optional: false,
            Comp: React.lazy(() => import('../FileUploader')),
        },
        {
            label: 'Edit and clean file',
            optional: true,
            Comp: React.lazy(() => import('../FileProcessor')),
        },
        {
            label: 'Select output format',
            optional: false,
        },
        {
            label: 'Download',
            optional: false,
        },
    ];
};

const getStepContent = (step: any, steps: any) => {
    if (!steps[step].Comp) return <> Not found </>;

    const Comp = steps[step].Comp;

    return <Comp />;
};

const LinearStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step: any) => step === 1;

    const isStepSkipped = (step: any) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const StepContent = () => {
        return (
            <>
                <>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    {isStepOptional(activeStep) && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSkip}
                            className={classes.button}
                        >
                            Skip
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </>
            </>
        );
    };

    const FinalControls = () => {
        return (
            <>
                <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                    Reset
                </Button>
            </>
        );
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map(({ label }, index) => {
                    const stepProps: any = {};
                    const labelProps: any = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Grid container alignItems="center">
                <Grid item xs={12} className={classes.contentContainer}>
                    <React.Suspense fallback={<>loading</>}>
                        {getStepContent(activeStep, steps)}
                    </React.Suspense>
                </Grid>
                <Grid item container justify="center">
                    {activeStep === steps.length ? (
                        <FinalControls />
                    ) : (
                        <StepContent />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default LinearStepper;
